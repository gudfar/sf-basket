import {ApiService} from "./index";

export default class BookStoreService {

    apiService = new ApiService();

    getBooks = async() => {
        return  await this.apiService.get('/books/');
    };
}
