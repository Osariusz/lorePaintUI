import React from "react";
import {Marker, Point} from "react-simple-maps";

interface PlaceProps {
    link: string;
    size: Point;
    position: Point;
}

const Place: React.FC<PlaceProps> = ({link, size, position}) => {
    return (
        <Marker coordinates={position}>
            <image style={{width: size.at(0), height: size.at(1)}}
                   href={link}/>
        </Marker>

    );
};

export default Place;