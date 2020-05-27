import { combineReducers } from 'redux'
import booksReducer from './booksReducer'
import basketReducer from './basketReducer'
import authReducer from "./authReducer";

export default combineReducers({
    booksReducer,
    basketReducer,
    authReducer
})
