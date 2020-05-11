import * as actionTypes from '../constants/actionTypes';

const initialState = {
    items: [],
    total: 0,
    loading: null,
    error: null
};

/**
 * @param state
 * @param action
 */
const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            return saveToBasket(state, action);
        case actionTypes.BASKET_REQUESTED:
            return {
                items: state.items,
                loading: true,
                error: null
            };
        case actionTypes.BASKET_FAILED:
            return {
                items: state.items,
                loading: false,
                error: action.payload
            };
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
const saveToBasket = (state, {payload: {id, quantity, book: {title, price}}}, countValue = 1) => {
    const { items } = state;
    debugger;
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex !== -1) {

        const items = [...state.items];
        items[itemIndex]['quantity'] = quantity;
        items[itemIndex]['price'] =  price * quantity;

        return {
            ...state,
            items,
            loading: null,
            error: null,
        };
    }

    return {
        ...state,
        items: [
            ...items,
            {
                id,
                title,
                quantity,
                price: price * quantity
            }
        ],
        loading: null,
        error: null,

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
