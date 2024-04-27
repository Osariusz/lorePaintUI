import Lore from "../types/Lore";
import api from "./Api";
import PlaceCreate from "../types/PlaceCreate";

class PlaceApi {

    static baseBackend = "/api/place";

    public static async createPlace(placeCreate: PlaceCreate) {
        const path = `/create`;
        try {
            await api.post(this.baseBackend+path,placeCreate, {withCredentials: true});
        } catch (error: any) {
            console.log("Place create failed" + error.message);
        }
    }
}

export default PlaceApi;