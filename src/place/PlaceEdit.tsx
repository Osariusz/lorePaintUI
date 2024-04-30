import React, {forwardRef} from 'react';
import Place from "./Place";
import Point from "ol/geom/Point";

interface PlaceEditProps {
    place: Place | null
}

const PlaceEdit = forwardRef( (props: PlaceEditProps, ref: any) => {
    let position = "";
    if(props && props.place) {
        let geometry = props.place.getGeometry() as Point;
        position = geometry.getCoordinates().toString();
    }
    return (
       <div ref={ref}>hello {position}</div>
    );
}
)

export default PlaceEdit;
