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
        case actionTypes.BASKET_LOADED:
            return loadBasket(state, action);
        case actionTypes.BASKET_FAILED:
            return {
                items: state.items,
                loading: false,
                error: action.payload
            };
        case actionTypes.CALCULATE_BASKET_AMOUNT:
            return calculateBasketAmount(state);
        case actionTypes.UPDATE_BASKET_ITEM_COUNT:
            if (Object.keys(action.payload).length === 1 && Object.keys(action.payload)[0] === 'id') {
                return deleteBasketItem(state, {payload: action.payload.id});
            }
            return saveToBasket(state, action);
        case actionTypes.DELETE_BASKET_ITEM:
            return deleteBasketItem(state, action);
        default:
            return state;
    }
};


const loadBasket = (state, {payload}) => {

    if (!payload.length) {
        return {
            ...state,
            loading: false,
            error: null,
            items: payload
        }
    }

    const items = payload.map(({id, quantity, book: {title, price}}) => (
        {
            id,
            title,
            quantity,
            price: price * quantity
        }
    ));

    return {
        ...state,
        items,
        loading: false,
        error: null
    }
};

/**
 * @param state
 * @param id
 * @param quantity
 * @param title
 * @param price
 * @returns {{loading: null, error: null, items: *}|{loading: null, error: null, items: *[]}}
 */
const saveToBasket = (state, {payload: {id, quantity, book: {title, price}}}) => {
    const { items } = state;
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
        items,
        loading: null,
        error: null,
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
