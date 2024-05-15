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
            console.log("PlaceDTO create failed" + error.message);
        }
    }

    public static async getAllPlaces(loreId: number) {
        let result = null;
        const path = `/all/${loreId}`;
        try {
            result = await api.get(this.baseBackend+path, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Getting all places failed" + error.message);
        }
        return result;
    }
}

export default PlaceApi;