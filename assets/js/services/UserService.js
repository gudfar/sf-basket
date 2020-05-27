import {AUTH_TOKEN} from "../constants/constants";

export default class UserService {

    setUserToken = ({token}) => {
        this.isLoggedIn();
        document.cookie = `${AUTH_TOKEN}=${token}; path=/`;
    };

    getUserToken = () => {
        return this.getCookie(AUTH_TOKEN);
    };

    getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    isLoggedIn = () => {
        return this.getUserToken() !== undefined;
    }
}
