import React, {useEffect, useRef, useState} from "react";
import Map from "ol/Map";
import View from "ol/View";
import {Projection} from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Place from "../place/Place";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import {getCenter} from "ol/extent";
import PlaceEdit from "../place/PlaceEdit";
import styled from "@emotion/styled";
import {Container, TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import LoreApi from "../utils/LoreApi";
import PlaceApi from "../utils/PlaceApi";
import {Overlay} from "ol";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import UserCursor from "../users/UserCursor";
import Cursor from "../types/Cursor";
import placeDTO from "../types/PlaceDTO";
import PlaceDTO from "../types/PlaceDTO";
import CursorDTO from "../types/CursorDTO";
import PlaceUpdateApi from "../utils/PlaceUpdateApi";
import ImageSource from "ol/source/Image";

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
    const [currentYear, setCurrentYear] = useState(2024);
    const [userCursors, setUserCursors] = useState<Cursor[]>([]);
    const userCursorsRef = useRef<Array<HTMLDivElement | null>>([]);
    const [mapURL, setMapURL] = useState<string | undefined>(undefined);

    const editElement = useRef<HTMLDivElement>(null);

    const idNumber = Number(id);

    const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);
    const [imageSource, setImageSource] = useState<ImageLayer<Static> | null>(null);

    const onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceEdit(null);
        setCurrentYear(Number(e.target.value));
    }

    const updateMap = () => {
        LoreApi.getMapByLoreId(idNumber, currentYear).then(response => {
            setMapURL(response?.picture_path);
        });
    }

    const onYearSubmit = (e: any) => {
        if(e.keyCode == 13) {
            vectorSource!.clear();
            loadPlaces(vectorSource!);
            updateMap();
        }
    }

    function loadPlaces(source: VectorSource) {
        PlaceApi.getAllPlacesBefore(idNumber, currentYear).then((response: Array<PlaceDTO>) => {
            response.forEach((place: placeDTO) => {
                const OLPlace = new Place(place, setPlaceEdit);
                source.addFeature(OLPlace);
            })
        })
    }

    function returnCreateUserCursor(name: string): Cursor {
        let localUserCursors = [...userCursors];
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

    useEffect(() => {
        imageSource?.setSource(new Static({
            attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
            url: mapURL!,

            imageExtent: extent,
        }));
    }, [mapURL]);

    function loadMap() {
        const source = new VectorSource();
        let vectorLayer = new VectorLayer({
            source: source
        });
        setVectorSource(source);

        const image = new ImageLayer({
                source: new Static({
                    attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
                    url: mapURL!,
                    imageExtent: extent,
                })
            })

        setImageSource(image);

        map.current = new Map({
            target: mapRef.current!,
            layers: [
                image,
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

        map.current.addOverlay(editOverlay);

        map.current.on('click', (event) => {
            let feature = map.current?.forEachFeatureAtPixel(event.pixel,
                function (feature) {
                    return feature;
                });

            vectorLayer.getFeatures(event.pixel).then(function (feature) {
                const coordinates = event.coordinate;
                if (feature.length > 0 && feature[0] instanceof Place) {
                    let place: Place = feature[0] as Place;
                    place.edit();
                    editOverlay.setPosition(coordinates);
                    return;
                }
                const placeDTO: PlaceDTO = {id: 0, x: coordinates.at(0)!, y: coordinates.at(1)!, name: "New Place"}
                const place = new Place(placeDTO, setPlaceEdit);
                editOverlay.setPosition(coordinates);
                source.addFeature(place);
            });

        });

        loadPlaces(source);

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
            if(!overlay) {
                let newOverlay = new Overlay(({
                    element: userCursorsRef.current[cursor.id]!,
                    stopEvent: false
                }));
                setCursorOverlay(mouseCursorDTO.username, newOverlay);
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
        const coordinates =  map.current?.getEventCoordinate(event);
        const coordinatesString = JSON.stringify(coordinates);
        publishMessage(coordinatesString);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
    }, [stompClient?.connected]);

    useEffect(() => {
        updateMap();
        if (!map.current && mapRef.current && editElement) {
            loadLore();
            loadMap();
        }
    }, []);


    return <StyledContainer>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="year"
            label="Year"
            name="year"
            autoComplete="year"
            autoFocus
            onChange={onYearChange}
            onKeyDown={onYearSubmit}
        />
            <PlaceEdit ref={editElement} place={placeEdit} loreId={idNumber} currentLoreYear={currentYear}/>
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
