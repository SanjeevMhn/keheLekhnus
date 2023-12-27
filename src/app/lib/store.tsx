import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReduder";

export const store = configureStore({
    reducer: rootReducer
});