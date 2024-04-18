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
import Feature from "ol/Feature";
import PlaceEdit from "../place/PlaceEdit";
import styled from "@emotion/styled";
import {Container} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router-dom";

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
    const { loreId } = useParams();
    const mapRef = useRef<HTMLDivElement>(null);
    const map = useRef<Map | null>(null);
    const [placeEdit, setPlaceEdit] = useState(null);

    const TEMP_BACKEND = "http://localhost:8080/api/lore/${loreId}";

    useEffect(() => {
        if (!mapRef.current) return;

        try {
            axios.get(TEMP_BACKEND, {withCredentials: true}).then((response) => {
                console.log(response);
            })

        } catch (error: any) {
            console.log("Lore failed" + error.message);
        }

        const source = new VectorSource();

        let vectorLayer = new VectorLayer({
                source: source
            });

        map.current = new Map({
            target: mapRef.current,
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

        map.current.on('click', (event) => {
            let feature = map.current?.forEachFeatureAtPixel(event.pixel,
                function(feature) {
                    return feature;
                });

            vectorLayer.getFeatures(event.pixel).then(function(feature) {
                if(feature.length > 0 && feature[0] instanceof Place) {
                    let place: Place = feature[0] as Place;
                    place.edit();
                    return;
                }
                source.addFeature(new Place(event.coordinate, setPlaceEdit));
            });

        });
    }, []);

    return <StyledContainer>
        <PlaceEdit place={placeEdit}/>
        <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </StyledContainer>;
};

export default LorePage;
