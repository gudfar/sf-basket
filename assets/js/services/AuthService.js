import {ApiService} from "./index";
import {AUTH_LOGIN} from "../constants/routes";

export default class AuthService {
    apiService = new ApiService();

    login = async(data) => {
        return  await this.apiService.post(AUTH_LOGIN, data);
    };
}
