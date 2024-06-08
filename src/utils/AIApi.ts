import Lore from "../types/Lore";
import axios from "axios";
import api from "./Api";
import LoreCreate from "../types/LoreCreate";
import MapUpdate from "../types/MapUpdate";
import AIPlaceDescriptionDTO from "../types/AIPlaceDescriptionDTO";

class AIApi {

    static baseBackend = "/api/ai";

    public static async getPlaceDescription(placeGenerationDTO: AIPlaceDescriptionDTO): Promise<string> {
        const path = `/generate/description`
        let result: string = "";
        try {
            result = await api.post(this.baseBackend+path,placeGenerationDTO, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Ask AI for place description failed" + error.message);
        }
        return result;
    }

}

export default AIApi;