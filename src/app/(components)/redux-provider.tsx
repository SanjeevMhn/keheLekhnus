"use client"

import { store } from "../lib/store";
import React, { ReactNode } from 'react';
import { Provider } from "react-redux";
import NotificationList from "./notification-list";
import ConfrimationContainer from "./confirmation-container";
import Dialog from "./dialog";

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