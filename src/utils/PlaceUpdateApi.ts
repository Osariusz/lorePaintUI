import Lore from "../types/Lore";
import api from "./Api";
import PlaceCreate from "../types/PlaceCreate";

class PlaceUpdateApi {

    static baseBackend = "/api/placeUpdate";

    public static async getLastPlaceUpdate(placeId: number, beforeYear: number): Promise<any> {
        let result = null;
        const path = `/last/${placeId}`;
        try {
            let date = new Date(`${beforeYear.toString().padStart(4, '0')}-01-01` );
            let dateString = date.toISOString();
            result = await api.post(this.baseBackend+path,{date: dateString}, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Last place update get failed" + error.message);
        }
        return result;
    }
}

export default PlaceUpdateApi;