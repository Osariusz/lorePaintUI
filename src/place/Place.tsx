import React from "react";
import {Marker, Point} from "react-simple-maps";

interface PlaceProps {
    link?: string;
    size?: Point;
    position: Point;
}

const defaultProps = {
    link: "default",
    size: [50,50] as Point
}

const Place = (props: PlaceProps) => {
    props = {...defaultProps, ...props}
    if(props.link === "default") {
        props.link = "https://cdn.discordapp.com/attachments/436214161077436426/1215734565340184636/tempplacelogo.png?ex=65fdd40b&is=65eb5f0b&hm=c12b17b57cf5f6c2fd0f2e64f46daad60b5462efb0b265e3f327c9c6c1d32a2f&"
    }
    console.log(props.position)
     return (
            <image x={props.position.at(0)} y = {props.position.at(1)} style={{width: props.size?.at(0), height: props.size?.at(1)}}
                   href={props.link}/>
    );
};

export default Place;