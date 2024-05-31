import Lore from "../types/Lore";
import axios from "axios";
import api from "./Api";
import LoreCreate from "../types/LoreCreate";

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