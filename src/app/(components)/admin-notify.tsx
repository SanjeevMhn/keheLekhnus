'use client'

import { FC, useEffect, useRef, useState } from "react"
import api from "../service/interceptor/interceptor";
import Link from "next/link";
import { TUserInfo } from "../lib/auth/authSlice";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const AdminNotify: FC = () => {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const [notifications, setNotifications] = useState<Array<any>>([]);
    const authState = useSelector((state: any) => state.auth);
    const userId = Number(authState.user_info.user_id)
    const fectchedNotify = useRef<boolean>(false);
    const notifyBtnRef = useRef<HTMLButtonElement>(null);

    const fetchNotifications = async () => {
        try {
            const response = await api.get(`${baseUrl}/notifications/id/${userId}`);
            const data = response.data;
            setNotifications(data.notifications);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        // const timeoutId = setTimeout(() => {
        //     fetchNotifications();
        // }, 10000);
        if(!fectchedNotify.current){
            fetchNotifications();
        }

        const socket = io(`${baseUrl}`);

        socket.on('orderAdded', fetchNotifications);

        return () => {
            // clearTimeout(timeoutId)
            socket.disconnect();
            fectchedNotify.current = true;
        }
    }, [])

    const handleUpdateNotify = async (id: number) => {
        try {
            const response = await api.post(`${baseUrl}/notifications/id/${id}`);
            notifyBtnRef.current?.blur();
            if(response.status == 204){
                fetchNotifications();
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className="nav-item admin-nav-item">
            <button type="button" className="notify-btn flex" ref={notifyBtnRef}>
                <span className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                </span>
                <span className="notify-num">{notifications.length}</span>
                <ul className="dropdown-list">
                    <h2 className="header-text">Notifications</h2>
                    {
                        notifications.length > 0 ? (
                            notifications.map((notify: any, index: number) => (
                                <li className="dropdown-item" key={index}>
                                    {
                                        notify.notification_type === 'Order Added' ? (
                                            <Link href={`/admin/orders/detail/${notify.sender_id}`} className="dropdown-link" onClick={() => handleUpdateNotify(notify.notification_id)}>
                                                <span className="icon-container">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" /></svg>
                                                </span>
                                                <span className="label-text">
                                                    {notify.notification_desc}
                                                </span>
                                            </Link>
                                        ) : (
                                            <>{notify.notication_desc}</>
                                        )
                                    }
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">
                                No Notifications
                            </li>
                        )
                    }
                </ul>
            </button>
        </li>
    )
}

export default AdminNotify;
