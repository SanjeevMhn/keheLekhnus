import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../cart/cartSlice';
import notificationReducer from "../notifications/notificationSlice";
import confirmationReducer from "../confirmation/confirmationSlice";
import dialogReducer from "../dialog/dialogSlice";
import authReducer from "../auth/authSlice";
import pdfViewReducer from "../pdfView/pdfViewSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    notifications: notificationReducer,
    confirmation: confirmationReducer,
    dialog: dialogReducer,
    auth: authReducer,
    pdfViewer: pdfViewReducer,
})

export default rootReducer;