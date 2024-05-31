import Lore from "../types/Lore";
import api from "./Api";
import PlaceCreate from "../types/PlaceCreate";
import PlaceUpdateDTO from "../types/PlaceUpdateDTO";
import Place from "../place/Place";

class PlaceUpdateApi {

    static baseBackend = "/api/placeUpdate";

    public static async getLastPlaceUpdate(placeId: number, beforeYear: number): Promise<PlaceUpdateDTO> {
        let result = null;
        const path = `/last/${placeId}`;
        try {
            let date = new Date(`${beforeYear.toString().padStart(4, '0')}-01-01` );
            let dateString = date.toISOString();
            result = await api.post(this.baseBackend+path,{lore_date: dateString}, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Last place update get failed" + error.message);
        }
        return result;
    }

    public static async createPlaceUpdate(placeId: number, placeUpdate: PlaceUpdateDTO): Promise<any> {
        const path = `/${placeId}/create`;
        try {
            await api.post(this.baseBackend+path,placeUpdate, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Last place update get failed" + error.message);
        }
    }
}

export default PlaceUpdateApi;