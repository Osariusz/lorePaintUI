import React, {useEffect, useRef, useState} from "react";
import Map from "ol/Map";
import View from "ol/View";
import {Projection, toLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Place from "../place/Place";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import {getCenter} from "ol/extent";
import Feature from "ol/Feature";
import PlaceEdit from "../place/PlaceEdit";
import styled from "@emotion/styled";
import {Container} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router-dom";
import LoreApi from "../utils/LoreApi";
import PlaceApi from "../utils/PlaceApi";
import PlaceCreate from "../types/PlaceCreate";
import Point from "ol/geom/Point";
import {Overlay} from "ol";
import {Coordinate, createStringXY, toStringHDMS} from "ol/coordinate";
import {StompSessionProvider, useStompClient, useSubscription} from "react-stomp-hooks";
import UserCursor from "../users/UserCursor";
import userCursor from "../users/UserCursor";
import Cursor from "../types/Cursor";
import {defaults, MousePosition} from "ol/control";
import placeDTO from "../types/PlaceDTO";
import PlaceDTO from "../types/PlaceDTO";
import CursorDTO from "../types/CursorDTO";

const extent = [0, 0, 1024, 968];
const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent,
});

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;



const LorePage = () => {
    const { id } = useParams();
    const mapRef = useRef<HTMLDivElement>(null);
    const map = useRef<Map | null>(null);
    const [forceRerender, setForceRerender] = useState(0);
    const [placeEdit, setPlaceEdit] = useState(null);
    const [userCursors, setUserCursors] = useState<Cursor[]>([]);
    const userCursorsRef = useRef<Array<HTMLDivElement | null>>(Array(1).fill(null));

    const editElement = useRef<HTMLDivElement>(null);

    const idNumber = Number(id);

    useEffect(() => {
        console.log("usef");
        console.log(userCursors);
        console.log(userCursorsRef.current);
    }, [userCursors]);

    function returnCreateUserCursor(name: string): Cursor {
        let localUserCursors = [...userCursors];
        const overlay = new Overlay(({
            element: userCursorsRef.current[localUserCursors.length]!,
        }));
        let newCursor = {
            id: localUserCursors.length,
            name:name,
            color:"red",
            overlay: undefined
        };

        localUserCursors.push(newCursor);
        setUserCursors(localUserCursors);
        return newCursor;
    }

    function getUserCursor(name: string): Cursor | null {
        let userCursor: Cursor | undefined = userCursors.find(userCursor => {
            return userCursor.name == name;
        });
        if(!userCursor) {
            console.log("no cursor?");
            returnCreateUserCursor(name);
            return null;
        }
        return userCursor;
    }

    function loadLore() {
        LoreApi.getLoreById(idNumber).then(response => {
            console.log(response);
        })
    }

    function loadMap() {
        const source = new VectorSource();
        let vectorLayer = new VectorLayer({
            source: source
        });
        map.current = new Map({
            target: mapRef.current!,
            layers: [
                new ImageLayer({
                    source: new Static({
                        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
                        url: 'https://imgs.xkcd.com/comics/online_communities.png',
                        projection: projection,
                        imageExtent: extent,
                    })
                }),
                vectorLayer,
            ],
            view: new View({
                projection: projection,
                center: getCenter(extent),
                zoom: 2,
                maxZoom: 8,
            }),
            controls: []
        });

        const editOverlay = new Overlay(({
            element: editElement.current!,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        }));


        // if(!userCursors.at(0)!.overlay) {
        //     userCursors.at(0)!.overlay = new Overlay(({
        //         element: userCursorsRef.current[0]!
        //     }))
        // }
        // map.current?.addOverlay(userCursors.at(0)!.overlay!);


        map.current.addOverlay(editOverlay);

        map.current.on('click', (event) => {
            let feature = map.current?.forEachFeatureAtPixel(event.pixel,
                function (feature) {
                    return feature;
                });

            vectorLayer.getFeatures(event.pixel).then(function (feature) {
                if (feature.length > 0 && feature[0] instanceof Place) {
                    let place: Place = feature[0] as Place;
                    place.edit();
                    return;
                }
                const coordinates = event.coordinate;
                const placeDTO: PlaceDTO = {id: 0, x: coordinates.at(0)!, y: coordinates.at(1)!, name: "New Place"}
                const place = new Place(placeDTO, setPlaceEdit);
                editOverlay.setPosition(coordinates);
                source.addFeature(place);
            });

        });

        PlaceApi.getAllPlaces(idNumber).then((response: Array<PlaceDTO>) => {
            response.forEach((place: placeDTO) => {
                const OLPlace = new Place(place, setPlaceEdit);
                source.addFeature(OLPlace);
            })
        })

    }

    function setCursorOverlay(cursor_name: string, overlay: Overlay) {
        let cursors = [...userCursors];
        for(let cursor of cursors) {
            if(cursor.name == cursor_name) {
                cursor.overlay = overlay;
            }
        }
        setUserCursors(cursors);
    }

    useSubscription(`/api/lore/${id}/get_mouse`, (message) => {
        const mouseCursorDTO: CursorDTO = JSON.parse(message.body);
        let cursor = getUserCursor(mouseCursorDTO.username);
        if(cursor) {
            let overlay = cursor.overlay;

            console.log("move with overlay");
            console.log(overlay);
            if(!overlay) {
                console.log("change overlay to");
                console.log(cursor.id);
                userCursorsRef.current = userCursorsRef.current.slice(0, cursor.id+1);
                console.log(userCursorsRef);
                setCursorOverlay(mouseCursorDTO.username, new Overlay(({
                    element: userCursorsRef.current[cursor.id]!
                })));
                console.log(userCursorsRef);
            }
            if(overlay && map.current) {
                overlay!.setPosition(mouseCursorDTO.coordinates);
                if(!overlay.getMap()) {
                    map.current?.addOverlay(overlay);
                }
            }

        }
    });

    const stompClient = useStompClient();

    const publishMessage = (message: string) => {
        if(stompClient) {
            //console.log(message);
            stompClient.publish({destination: `/api/app/${id}/set_mouse`, body: message})
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        const coordinates =  map.current?.getEventCoordinate(event);//{x: event.clientX, y: event.clientY};
        const coordinatesString = JSON.stringify(coordinates);
        publishMessage(coordinatesString);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
    }, [stompClient?.connected]);

    useEffect(() => {
        if (!map.current && mapRef.current && editElement) {
            loadLore();
            loadMap();
        }
    }, []);


    return <StyledContainer>
            <PlaceEdit ref={editElement} place={placeEdit} loreId={idNumber}/>
            {
                userCursors.map(((cursor, i) => (
                    <UserCursor key={i} color={"red"} name={cursor.name} ref={(el: HTMLDivElement | null) => userCursorsRef.current[i] = el}/>
                )))
            }
            <div ref={mapRef} style={{width: '100%', height: '100vh'}}/>
    </StyledContainer>
        ;
};

export default LorePage;
