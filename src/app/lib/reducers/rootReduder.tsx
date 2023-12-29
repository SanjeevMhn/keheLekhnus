import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import notificationReducer from "../notifications/notificationSlice";
import confirmationReducer from "../confirmation/confirmationSlice";
import searchDialogReducer from "../search-dialog/searchDialogSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    notifications: notificationReducer,
    confirmation: confirmationReducer,
    searchDialog: searchDialogReducer
})

export default rootReducer;