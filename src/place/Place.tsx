import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import {Icon, Style} from "ol/style";
import {Coordinate} from "ol/coordinate";
import PlaceDTO from "../types/PlaceDTO";
import PlaceUpdateApi from "../utils/PlaceUpdateApi";

class Place extends Feature {
    private setPlaceEdit: any;
    private id: number;

    constructor(place: PlaceDTO, setPlaceEdit: any) {
        super({
            geometry: new Point([place.x,place.y]),
        });
        let link = "https://www.svgrepo.com/show/314953/place-marker.svg"
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
        this.id = place.id;
        setPlaceEdit(this);
    }

    public getBackendId(): number {
        return this.id;
    }

    edit = () => {
        this.setPlaceEdit(this);
    }


}

export default Place;