import * as actionTypes from '../constants/actionTypes';
import {BasketService} from "../services";

const basketService = new BasketService();

const basketRequested = () => ({
    type: actionTypes.BASKET_REQUESTED
});


const basketFailed = (error) => ({
    type: actionTypes.BASKET_FAILED,
    payload: error
});

const addToBasket = (item, dispatch) => {
    dispatch(basketRequested());
    basketService.saveToBasket(item.id)
        .then(() => {
            dispatch({type: actionTypes.ADD_TO_BASKET, payload: item});
            dispatch(calculateBasketAmount());
        })
        .catch((error) => dispatch(basketFailed(error)));
};

const calculateBasketAmount = () => ({type: actionTypes.CALCULATE_BASKET_AMOUNT});

const increaseBasketItemCount = (id, dispatch) => {
    dispatch({type: actionTypes.INCREASE_BASKET_ITEM_COUNT, payload: { id }});
    dispatch(calculateBasketAmount());
};

const decreaseBasketItemCount = (id, dispatch) => {
    dispatch({type: actionTypes.DECREASE_BASKET_ITEM_COUNT, payload: { id }});
    dispatch(calculateBasketAmount());
};

const deleteBasketItem = (id, dispatch) => {
    dispatch({type: actionTypes.DELETE_BASKET_ITEM, payload: id});
    dispatch(calculateBasketAmount());
};

export {
    addToBasket,
    increaseBasketItemCount,
    decreaseBasketItemCount,
    deleteBasketItem
};
