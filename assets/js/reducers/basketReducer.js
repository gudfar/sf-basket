import * as actionTypes from '../constants/actionTypes';

const initialState = {
    items: [],
    total: 0,
};

/**
 * @param state
 * @param action
 */
const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            return saveToBasket(state, action);
        case actionTypes.CALCULATE_BASKET_AMOUNT:
            return calculateBasketAmount(state);
        case actionTypes.INCREASE_BASKET_ITEM_COUNT:
            return saveToBasket(state, action);
        case actionTypes.DECREASE_BASKET_ITEM_COUNT:
            return saveToBasket(state, action, -1);
        case actionTypes.DELETE_BASKET_ITEM:
            return deleteBasketItem(state, action);
        default:
            return state;
    }
};

/**
 * @param state
 * @param item
 * @param countValue
 * @returns {{items: *}|{items: *[]}}
 */
const saveToBasket = (state, {payload: item}, countValue = 1) => {
    const { items } = state;

    const itemIndex = items.findIndex(i => i.id === item.id);
    if (itemIndex !== -1) {
        return updateBasketItem(itemIndex, state, countValue)
    }

    const newItem = {
        id: item.id,
        title: item.title,
        count: 1,
        price: item.price
    };
    return {
        ...state,
        items: [
            ...items,
            newItem
        ]
    };
};

const calculateBasketItemCount = (currentCount, value) => {
    return {
        oldCount: currentCount,
        count: currentCount + value,
    };
};

const deleteBasketItem = (state, {payload: id}) => {
    const items = [...state.items];
    const itemIndex = items.findIndex(i => i.id === id);
    items.splice(itemIndex, 1);
    return {
        ...state,
        items
    };
};
/**
 * @param idx
 * @param state
 * @param countValue
 * @returns {{items: *}}
 */
const updateBasketItem = (idx, state, countValue) => {
    const items = [...state.items];
    const {oldCount, count} = calculateBasketItemCount(items[idx]['count'], countValue);
    items[idx]['count'] = count;
    items[idx]['price'] = items[idx]['price'] / oldCount * count;

    if (items[idx]['count'] === 0) {
        items.splice(idx, 1);
    }

    return {
        ...state,
        items
    };
};

/**
 * @param state
 * @returns {{total: *}}
 */
const calculateBasketAmount = (state) => {
    const {items} = state;
    const newTotal = items.reduce((amount, item) => amount + item.price, 0);
    return {
        ...state,
        total: newTotal
    };
};

export default basketReducer;