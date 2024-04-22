import Lore from "../types/Lore";
import axios from "axios";
import api from "./Api";

class LoreApi {

    static baseBackend = "/api/lore";

    public static async getLoreById(id: any): Promise<Lore | null> {
        let result = null;
        if(isNaN(id)) {
            console.log("Lore get is NaN");
            return result;
        }
        const path = `/${id}`;
        try {
            result = await api.get(this.baseBackend+path, {withCredentials: true}).then((response) => {
                return response.data;
            })

        } catch (error: any) {
            console.log("Lore get failed" + error.message);
        }
        return result;
    }

    public static async getAllLores(): Promise<Lore[]> {
        const path = `/available`
        let result: Lore[] = [];
        try {
            result = await api.get(this.baseBackend+path, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Lores available get failed" + error.message);
        }
        return result;
    }

}

export default LoreApi;