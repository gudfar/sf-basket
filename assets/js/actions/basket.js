import * as actionTypes from '../constants/actionTypes';

const addToBasket = (item, dispatch) => {
    dispatch({type: actionTypes.ADD_TO_BASKET, payload: item});
    dispatch(calculateBasketAmount());
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
