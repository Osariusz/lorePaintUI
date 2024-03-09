import React, {ForwardedRef, forwardRef, useEffect, useState} from "react";
// @ts-ignore
import {ComposableMap, ZoomableGroup, useZoomPanContext, useMapContext, Point} from "react-simple-maps";
import Place from "../place/Place";

const LorePage = () => {
    const [places, setPlaces] = useState([]);

    const imageWidth = 1653;
    const imageHeight = 796;

    const clickHandler = (event:any) => {
        const coordinates = [event.clientX, event.clientY];
        addPlace(coordinates);
    }

    const addPlace = (position:any) => {
        // @ts-ignore
        setPlaces(prevPlaces => [...prevPlaces, <Place position={position}/>]);
    }

    return (
        <ComposableMap width={imageWidth} height={imageHeight} onClick={clickHandler}>
            <ZoomableGroup>
                <image id={"image"} href={"https://cdn.discordapp.com/attachments/436214161077436426/1215728818174697513/image.png?ex=65fdceb1&is=65eb59b1&hm=b43de10d49dc3ef3bc227ff0c541b10642d10d83accc15ff85e46c3ff016f506&"}/>
                {places}
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default LorePage;
