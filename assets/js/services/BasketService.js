import {ApiService} from "./index";

export default class BasketService {

    apiService = new ApiService();

    saveToBasket = async(id) => {
        return  await this.apiService.saveData('/basket', {id, userId: 1});
    };
    deleteBasketItem = async(id) => {
        return  await this.apiService.deleteData(`/basket/${id}`);
    };
}
