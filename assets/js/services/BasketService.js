import {ApiService} from "./index";
import {BASKET} from "../constants/routes";

export default class BasketService {

    apiService = new ApiService();

    saveToBasket = async(id) => {
        return  await this.apiService.post(BASKET, {id});
    };
    deleteBasketItem = async(id) => {
        return  await this.apiService.delete(`/basket/${id}`);
    };
    getBasketItems = async() => {
        return  await this.apiService.get(`/basket`);
    };

    updateBasketItemCount = async (id, counterValue) => {
        return  await this.apiService.patch(`/basket/${id}`, {counterValue});
    };
}
