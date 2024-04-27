import Point from "ol/geom/Point";
import {Coordinate} from "ol/coordinate";

interface BackendPoint {
    x: number | undefined,
    y: number | undefined
}

interface PlaceCreate {
    name: string,
    description: string,
    loreId: number,
    creationLoreDate: Date,
    point: BackendPoint
}

export default PlaceCreate;