import {ApiService} from "./index";

export default class BasketService {

    apiService = new ApiService();

    saveToBasket = async(id) => {
        return  await this.apiService.saveData('/basket', {id});
    };
}
