
export default class ApiService {

    _apiBaseUrl = 'http://localhost:8011/api';

    get = async(url) => {
        const data = await fetch(`${this._apiBaseUrl}${url}`);
        if (!data.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${data.status}`)
        }
        return await data.json();
    };

    post = async (url, payload) => {
        const data = await fetch(`${this._apiBaseUrl}${url}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!data.ok) {
            throw new Error(`Could not save ${url}` +
                `, received ${data.status}`)
        }
        return await data.json();
    };

    delete = async (url) => {
        const data = await fetch(`${this._apiBaseUrl}${url}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json*/*',
                'Content-Type': 'application/json'
            },
        });
        if (!data.ok) {
            throw new Error(`Could not delete ${url}` +
                `, received ${data.status}`)
        }
        return await data.json();
    };


    patch = async (url, payload) => {
        const data = await fetch(`${this._apiBaseUrl}${url}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!data.ok) {
            throw new Error(`Could not save ${url}` +
                `, received ${data.status}`)
        }
        return await data.json();
    };
}
