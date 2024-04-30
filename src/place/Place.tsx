import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import {Icon, Style} from "ol/style";
import {Coordinate} from "ol/coordinate";

class Place extends Feature {
    private setPlaceEdit: any;
    constructor(position: Coordinate, setPlaceEdit: any, size: Coordinate = [50,50], link: string = "default") {
        super({
            geometry: new Point(position),
        });
        if(link === "default") {
            link = "https://www.svgrepo.com/show/314953/place-marker.svg"
        }
        //TODO: add size change to style
        let iconStyles = new Style({image: new Icon({
                src: link
            })});

        this.setStyle(function(feature, resolution) {
                iconStyles.getImage()?.setScale(0.1/Math.pow(resolution, 1/3));
                return iconStyles;
            }
        );
        this.setPlaceEdit = setPlaceEdit;
        setPlaceEdit(this);
    }

    edit = () => {
        this.setPlaceEdit(this);
    }


}

export default Place;