import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import {Icon, Style} from "ol/style";
import {Coordinate} from "ol/coordinate";

interface PlaceProps {
    link?: string;
    size?: Coordinate;
    position: Coordinate;
}

const defaultProps = {
    link: "default",
    size: [50,50] as Coordinate
}

interface zoomPanContext {
    x: number,
    y: number,
    k: number
}

const Place = (props: PlaceProps): Feature => {
    props = {...defaultProps, ...props}
    if(props.link === "default") {
        props.link = "https://cdn.discordapp.com/attachments/436214161077436426/1215734565340184636/tempplacelogo.png?ex=65fdd40b&is=65eb5f0b&hm=c12b17b57cf5f6c2fd0f2e64f46daad60b5462efb0b265e3f327c9c6c1d32a2f&"
    }
    //TODO: add size change to style
    let iconStyles = new Style({image: new Icon({
            src: props.link
    })});

    let toReturn = new Feature({
        geometry: new Point(props.position),
    });

    toReturn.setStyle(function(feature, resolution) {
            iconStyles.getImage()?.setScale(0.1/Math.pow(resolution, 1/3));
            return iconStyles;
        }
    );

    return toReturn;
};

export default Place;