import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import notificationReducer from "../notifications/notificationSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    notifications: notificationReducer
})

export default rootReducer;