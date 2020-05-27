import * as actionTypes from '../constants/actionTypes';
import {UserService} from "../services";

const userService = new UserService();

const initialState = {
    isLoggedIn: false,
    loading: false,
    error: null
};

/**
 * @param state
 * @param action
 */
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            userService.setUserToken(action.payload);
            return {
                isLoggedIn: true,
                loading: false,
                error: null
            };
        case actionTypes.LOGIN_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.LOGIN_FAILED:
            return {
                isLoggedIn: false,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};




export default authReducer;
