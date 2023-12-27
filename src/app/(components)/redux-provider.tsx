"use client"

import { store } from "../lib/store";
import React, { ReactNode } from 'react';
import { Provider } from "react-redux";
import NotificationList from "./notification-list";

type ReduxProviderType = {
    children: ReactNode
}

export default function ReduxProvider({ children }: ReduxProviderType) {
    return (
        <Provider store={store}>
            {children}
            <NotificationList />
        </Provider>)
}