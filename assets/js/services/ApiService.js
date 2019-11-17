
export default class ApiService {

    _apiBaseUrl = 'http://localhost:8011/api';

    getData = async(url) => {
        const data = await fetch(`${this._apiBaseUrl}${url}`);
        if (!data.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${data.status}`)
        }
        return await data.json();
    };
}