import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import notificationReducer from "../notifications/notificationSlice";
import confirmationReducer from "../confirmation/confirmationSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    notifications: notificationReducer,
    confirmation: confirmationReducer
})

export default rootReducer;