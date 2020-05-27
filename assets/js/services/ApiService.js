import {UserService} from "./index";

export default class ApiService {

    _userService = new UserService();
    _apiBaseUrl = 'http://localhost:8011/api';

    apiRequest = async (url, method, payload) => {
        let headers = {
            method,
            headers: {
                'Accept': 'application/json*/*',
                'Content-Type': 'application/json',
                'Authorization': `Api-token ${this._userService.getUserToken()}`
            },
        };

        if (payload) {
            headers = {
                ...headers,
                body: JSON.stringify(payload)
            }
        }

        const data = await fetch(`${this._apiBaseUrl}${url}`, headers);
        if (!data.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${data.status}`)
        }
        return await data.json();
    };

    get = async(url) => {
        return this.apiRequest(url, "GET")
    };

    post = async (url, payload) => {
        return this.apiRequest(url, "POST", payload)
    };

    delete = async (url) => {
        return this.apiRequest(url, "DELETE");
    };

    patch = async (url, payload) => {
        return this.apiRequest(url, "PATCH", payload);
    };
}
