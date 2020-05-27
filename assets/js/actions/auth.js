import * as actionTypes from '../constants/actionTypes';
import {AuthService} from "../services";


const authService = new AuthService();


const loginSuccess = (payload) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload
});

const loginRequested = () => ({
    type: actionTypes.LOGIN_REQUESTED,
});

const loginFailed = (error) => ({
    type: actionTypes.LOGIN_FAILED,
    payload: error
});

const login = (dispatch, data) => {
    dispatch(loginRequested());
    authService.login(data)
        .then((token) => dispatch(loginSuccess(token)))
        .catch((error) => dispatch(loginFailed(error)));
};

export {
    login
};
