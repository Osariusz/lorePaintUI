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

    public static async getAllPlacesBefore(loreId: number, beforeYear: number) {
        let result = [];
        const path = `/all_before/${loreId}`;
        try {
            let date = new Date(`${beforeYear.toString().padStart(4, '0')}-01-01` );
            let dateString = date.toISOString();
            result = await api.post(this.baseBackend+path,{date: dateString}, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Getting all places before date failed" + error.message);
        }
        return result;
    }
}

export default PlaceApi;