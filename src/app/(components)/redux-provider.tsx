"use client"

import { store } from "../lib/store";
import React, { ReactNode, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from "react-redux";
import NotificationList from "./notification-list";
import ConfrimationContainer from "./confirmation-container";
import Dialog from "./dialog";
import axios, { AxiosRequestConfig } from "axios";
import { setUserData } from "../lib/auth/authSlice";
import { injectStore } from "../service/interceptor/interceptor";

injectStore(store);

type ReduxProviderType = {
    children: ReactNode
}

export default function ReduxProvider({ children }: ReduxProviderType) {
    return (
        <Provider store={store}>
            {children}
            <NotificationList />
            <ConfrimationContainer />
            <Dialog />
        </Provider>)
}