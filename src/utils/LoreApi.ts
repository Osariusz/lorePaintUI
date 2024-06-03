import Lore from "../types/Lore";
import axios from "axios";
import api from "./Api";
import LoreCreate from "../types/LoreCreate";
import MapUpdate from "../types/MapUpdate";

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

    public static async getMapByLoreId(id: any, beforeYear: number): Promise<MapUpdate | null> {
        let result = null;
        if(isNaN(id)) {
            console.log("Lore get is NaN");
            return result;
        }
        const path = `/${id}/get_last_map_update`;
        try {
            let date = new Date(`${beforeYear.toString().padStart(4, '0')}-01-01` );
            let dateString = date.toISOString();
            result = await api.post(this.baseBackend+path,{lore_date: dateString}, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Lore map get failed" + error.message);
        }
        return result;
    }

    public static async createLore(loreCreate: LoreCreate) {
        const path = `/create`;
        try {
            await api.post(this.baseBackend+path,loreCreate, {withCredentials: true});
        } catch (error: any) {
            console.log("Lore create failed" + error.message);
        }
    }

    public static async addUser(id: number, username: string) {
        const path = `/${id}/add_user`;
        try {
            await api.post(this.baseBackend+path, {username: username}, {withCredentials: true});
        } catch (error: any) {
            console.log("Lore add user failed" + error.message);
        }
    }

    public static async getAvailableLores(): Promise<Lore[]> {
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

    public static async getAllLores(): Promise<Lore[]> {
        const path = `/all`
        let result: Lore[] = [];
        try {
            result = await api.get(this.baseBackend+path, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Lores all get failed" + error.message);
        }
        return result;
    }

}

export default LoreApi;