import api from "./Api";

class AllUpdateApi {

    static baseBackend = "/api/allUpdate";

    public static async getAllUpdates(loreId: number): Promise<Date[]> {
        let result = null;
        const path = `/${loreId}`;
        try {
            result = await api.get(this.baseBackend + path, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            throw new Error("All update get failed" + error.message);
        }
        return result;
    }
}

export default AllUpdateApi;