import {ApiService} from "./index";
import {BASKET} from "../constants/routes";

export default class BasketService {

    apiService = new ApiService();

    saveToBasket = async(id) => {
        return  await this.apiService.post(BASKET, {id, userId: 1});
    };
    deleteBasketItem = async(id) => {
        return  await this.apiService.delete(`/basket/${id}`);
    };
    getBasketItems = async() => {
        const userId = 1;
        return  await this.apiService.get(`/basket/${userId}`);
    };

    updateBasketItemCount = async (id, counterValue) => {
        return  await this.apiService.patch(`/basket/${id}`, {counterValue});
    };
}
