import Lore from "../types/Lore";
import axios from "axios";
import api from "./Api";

class AuthApi {

    static baseBackend = "/public";


    public static async login(username: string, password: string, setLoggedIn: any) {
        const path = `/login`;
        try {
            const response = await api.post(this.baseBackend+path, {
                    username,
                    password
                }, {withCredentials: true}
            )
            if(response.status == 200) {
                setLoggedIn(true);
            }
        } catch (error: any) {
            console.log("Login failed" + error.message);
        }
    }

    public static async register(username: string, password: string, setRegistered: any) {
        const path = `/register`;
        try {
            const response = await api.post(this.baseBackend+path, {
                    username,
                    password
                }, {withCredentials: true}
            )
            if(response.status == 200) {
                setRegistered(true);
            }
        } catch (error: any) {
            console.log("Register failed" + error.message);
        }
    }

    public static async logout(setLogout: any) {
        const path = `/logout`;
        try {
            const response = await api.post(this.baseBackend+path,{}, {withCredentials: true});
            if(response.status == 200) {
                setLogout(true);
            }
        } catch (error: any) {
            console.log("Logout failed" + error.message);
        }
    }
}

export default AuthApi;