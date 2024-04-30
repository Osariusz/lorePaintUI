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
import {toStringHDMS} from "ol/coordinate";

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

    const editElement = useRef<HTMLDivElement>(null);

    const idNumber = Number(id);

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

            const overlay = new Overlay(({
                element: editElement.current!,
                autoPan: {
                    animation: {
                        duration: 250,
                    },
                },
            }));
            map.current.addOverlay(overlay);

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
                    const point = new Point(coordinates).getCoordinates();
                    const placeCreate: PlaceCreate = {
                        name: "miejsce",
                        description: "nowe miejsce",
                        loreId: idNumber,
                        creationLoreDate: new Date(),
                        point: {x: point.at(0), y: point.at(1)}
                    }

                    const coordinate = event.coordinate;
                    const hdms = toStringHDMS(toLonLat(coordinate));

                    overlay.setPosition(coordinate);


                    source.addFeature(place);
                    PlaceApi.createPlace(placeCreate);
                });

            });
        }}, []);


    return <StyledContainer>
        <PlaceEdit ref={editElement} place={placeEdit}/>

        <div ref={mapRef} style={{width: '100%', height: '100vh'}}/>


    </StyledContainer>
        ;
};

export default LorePage;
