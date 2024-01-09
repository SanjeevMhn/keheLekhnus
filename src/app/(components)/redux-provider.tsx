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
import Header from "./Header";
import Link from "next/link";
import SideNav from "./sidenav";

injectStore(store);

type ReduxProviderType = {
    children: ReactNode
}

export default function ReduxProvider({ children }: ReduxProviderType) {
    const adminUser = store.getState().auth.user_info?.is_admin;
    console.log(adminUser);
    return (
        <Provider store={store}>
            <div className={`wrapper ${adminUser ? 'has-sidenav' : ''}`}>
                {
                    adminUser ? (
                        <SideNav/>
                    ) : null
                }
                <Header />
                <section className="child-container">
                    {children}
                </section>

            </div>
            <NotificationList />
            <ConfrimationContainer />
            <Dialog />
        </Provider>)
}