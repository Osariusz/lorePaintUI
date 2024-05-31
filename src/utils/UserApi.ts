import api from "./Api";

class UserApi {

    static baseBackend = "/api/user";

    public static async getAllUsers(): Promise<any[]>  {
        let result = [];
        const path = `/all`;
        try {
            result = await api.get(this.baseBackend+path, {withCredentials: true}).then((response) => {
                return response.data;
            });
        } catch (error: any) {
            console.log("Get all users failed" + error.message);
        }
        return result;
    }
}

export default UserApi;