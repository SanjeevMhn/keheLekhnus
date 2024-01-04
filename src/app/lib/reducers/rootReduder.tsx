import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import notificationReducer from "../notifications/notificationSlice";
import confirmationReducer from "../confirmation/confirmationSlice";
import dialogReducer from "../dialog/dialogSlice";
import authReducer from "../auth/authSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    notifications: notificationReducer,
    confirmation: confirmationReducer,
    dialog: dialogReducer,
    auth: authReducer
})

export default rootReducer;