import React, {useEffect, useRef, useState} from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat, Projection} from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Place from "../place/Place";
import {Icon, Style} from "ol/style";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import {getCenter} from "ol/extent";

const extent = [0, 0, 1024, 968];
const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent,
});

const LorePage: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const map = useRef<Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const source = new VectorSource();
        
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
                new VectorLayer({
                    source: source
                }),
            ],
            view: new View({
                projection: projection,
                center: getCenter(extent),
                zoom: 2,
                maxZoom: 8,
            }),
        });

        map.current.on('click', (event) => {
            source.addFeature(Place({position: event.coordinate}));
        });
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default LorePage;
