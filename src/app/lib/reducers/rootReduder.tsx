import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import notificationReducer from "../notifications/notificationSlice";
import confirmationReducer from "../confirmation/confirmationSlice";
import dialogReducer from "../dialog/dialogSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    notifications: notificationReducer,
    confirmation: confirmationReducer,
    dialog: dialogReducer
})

export default rootReducer;