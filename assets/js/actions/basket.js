import * as actionTypes from '../constants/actionTypes';
import {BasketService} from "../services";

const basketService = new BasketService();

const basketRequested = () => ({
    type: actionTypes.BASKET_REQUESTED
});

const basketLoaded = (basketList) => ({
    type: actionTypes.BASKET_LOADED,
    payload: basketList
});

const basketFailed = (error) => ({
    type: actionTypes.BASKET_FAILED,
    payload: error
});

const addToBasket = (id, dispatch) => {
    dispatch(basketRequested());
    basketService.saveToBasket(id)
        .then((data) => {
            dispatch({type: actionTypes.ADD_TO_BASKET, payload: data});
            dispatch(calculateBasketAmount());
        })
        .catch((error) => dispatch(basketFailed(error)));
};

const fetchBasketItems = (dispatch) => {
    dispatch(basketRequested());
    basketService.getBasketItems()
        .then((data) => {
            dispatch(basketLoaded(data));
            dispatch(calculateBasketAmount());
        })
        .catch((error) => dispatch(basketFailed(error)));

};

const calculateBasketAmount = () => ({type: actionTypes.CALCULATE_BASKET_AMOUNT});

const updateBasketItemCount = ({id, counterValue}, dispatch) => {
    dispatch(basketRequested());
    basketService.updateBasketItemCount(id, counterValue)
        .then((data) => {
            dispatch({type: actionTypes.UPDATE_BASKET_ITEM_COUNT, payload: data});
            dispatch(calculateBasketAmount());
        })
        .catch((error) => dispatch(basketFailed(error)));
};


const deleteBasketItem = (id, dispatch) => {
    dispatch(basketRequested());
    basketService.deleteBasketItem(id)
        .then(() => {
            dispatch({type: actionTypes.DELETE_BASKET_ITEM, payload: id});
            dispatch(calculateBasketAmount());
        })
        .catch((error) => dispatch(basketFailed(error)));
};

export {
    addToBasket,
    updateBasketItemCount,
    deleteBasketItem,
    fetchBasketItems
};
