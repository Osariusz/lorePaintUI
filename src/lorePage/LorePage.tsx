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

        let iconStyles = new Style({image: new Icon({
            src: "https://cdn.discordapp.com/attachments/436214161077436426/1215734565340184636/tempplacelogo.png?ex=65fdd40b&is=65eb5f0b&hm=c12b17b57cf5f6c2fd0f2e64f46daad60b5462efb0b265e3f327c9c6c1d32a2f&",
        })});
        
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
                    source: source,
                    style: iconStyles
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
            const feature = new Feature({
                geometry: new Point(event.coordinate),
            });



            feature.setStyle(function(feature, resolution) {
                    iconStyles.getImage()?.setScale(0.1/Math.pow(resolution, 1/3));
                    return iconStyles;
                }
            );

            source.addFeature(feature);
        });
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default LorePage;
