import React, {useState} from "react";
import {ComposableMap, ZoomableGroup, Marker, Point} from "react-simple-maps";
import Place from "../place/Place";
import place from "../place/Place";
import {geoPath, GeoPermissibleObjects} from "d3-geo"

import { geoMercator } from "d3-geo";
import { D3ZoomEvent } from "d3-zoom";

// ...

const projection = geoMercator();

// url to a valid topojson file
const globalProjection = "geoMercator";

interface MapPosition {
    coordinates: Point;
    zoom: number;
}

const LorePage = () => {

    const [places, setPlaces] = useState<JSX.Element[]>([]);

    const addPlace = (position: Point) => {
        setPlaces(prevPlaces => [...prevPlaces, <Place position={position}/>]);
    }

    const handleClick = (event: React.MouseEvent) => {
        const {clientX, clientY} = event;
        console.log(clientX)
        console.log(clientY)
        // @ts-ignore
        const mapCoords = projection.invert([clientX, clientY]);
        console.log(mapCoords)
        // @ts-ignore
        addPlace(mapCoords as Point);
    }


    const handleMoveStart = (a: { coordinates: [number, number]; zoom: number }) => {
        console.log(a.zoom)
    };
    return (
            <ComposableMap projection={globalProjection} projectionConfig={{center: [0,0]}} onClick={handleClick}>
                <ZoomableGroup zoom={1} maxZoom={20} minZoom={0} onMoveStart={handleMoveStart}>
                    <image id={"image"}
                        href={"https://cdn.discordapp.com/attachments/436214161077436426/1215728818174697513/image.png?ex=65fdceb1&is=65eb59b1&hm=b43de10d49dc3ef3bc227ff0c541b10642d10d83accc15ff85e46c3ff016f506&"}/>

                    {places}
                </ZoomableGroup>
            </ComposableMap>

    );
};

export default LorePage;