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
    const [placeEdit, setPlaceEdit] = useState(null);
    const [userCursors, setUserCursor] = useState<Cursor[]>([{id: 0, name:"zenek333",color:"red"}]);
    const userCursorsRef = useRef<any[]>([]);

    const [cursorOverlay, setCursorOverlay] = useState<Overlay>();

    const editElement = useRef<HTMLDivElement>(null);

    const idNumber = Number(id);

    useEffect(() => {
        userCursorsRef.current = userCursorsRef.current.slice(0, userCursors.length);
    }, [userCursors]);

    useSubscription('/api/topic/reply', (message) => {
        if(cursorOverlay) {
            const coordinates = JSON.parse(message.body);
            cursorOverlay!.setPosition(coordinates);
        }
    });

    const stompClient = useStompClient();

    const publishMessage = (message: string) => {
        if(stompClient) {
            stompClient.publish({destination: '/api/app/broadcast', body: message})
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
            LoreApi.getLoreById(idNumber).then(response => {
                console.log(response);
            })


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
            const localCursorOverlay = new Overlay(({
                element: userCursorsRef.current[0]!
            }));
            setCursorOverlay(localCursorOverlay);

            map.current.addOverlay(editOverlay);
            map.current.addOverlay(localCursorOverlay!);

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
                    const place = new Place(coordinates, setPlaceEdit);
                    editOverlay.setPosition(coordinates);
                    source.addFeature(place);
                });

            });
        }}, []);


    return <StyledContainer>
            {
                userCursors.map(((cursor, i) => (
                <UserCursor key={i} color={"red"} ref={el => userCursorsRef.current[i] = el}/>
                )))
            }
            <PlaceEdit ref={editElement} place={placeEdit} loreId={idNumber}/>
            <div ref={mapRef} style={{width: '100%', height: '100vh'}}/>
    </StyledContainer>
        ;
};

export default LorePage;
