import {ApiService} from "./index";
import {BOOKS} from "../constants/routes";

export default class BookStoreService {

    apiService = new ApiService();

    getBooks = async() => {
        return  await this.apiService.get(BOOKS);
    };
}
