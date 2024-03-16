import React from 'react';
import Place from "./Place";
import Point from "ol/geom/Point";

interface PlaceEditProps {
    place: Place | null
}

const PlaceEdit = (props: PlaceEditProps) => {
    let position = "";
    if(props && props.place) {
        let geometry = props.place.getGeometry() as Point;
        position = geometry.getCoordinates().toString();
    }
    return (
       <div>hello {position}</div>
    );
};

export default PlaceEdit;
