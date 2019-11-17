import { combineReducers } from 'redux'
import booksReducer from './booksReducer'
import basketReducer from './basketReducer'

export default combineReducers({
    booksReducer,
    basketReducer
})