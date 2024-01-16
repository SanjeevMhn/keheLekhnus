'use client'

import { useEffect, useRef, useState } from "react";
import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb";
import api from "../service/interceptor/interceptor";
import Link from "next/link";

export default function Home() {
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalCategories, setTotalCategories] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0)
    const [totalUsers, setTotalUsers] = useState<number>(20);
    const dashboardFetched = useRef<boolean>(false);

    useEffect(() => {
        if (!dashboardFetched.current) {
            getTotalProducts();
            getTotalCategories();
            getTotalOrders();
        }
        return () => {
            dashboardFetched.current = true;
        }
    }, [])

    const getTotalProducts = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/v1/products/count');
            const data = await response.data;
            setTotalProducts(data.count)
        } catch (e) {
            console.error(e);
        }
    }

    const getTotalCategories = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/v1/products/categories/count');
            const data = await response.data;
            setTotalCategories(data.count)
        } catch (e) {
            console.error(e)
        }
    }

    const getTotalOrders = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/v1/orders/count');
            const data = response.data;
            setTotalOrders(data.count);
        } catch (e) {
            console.error(e)
        }
    }

    const crumbs: Array<TBreadCrumb> = [
        {
            name: 'admin',
            link: '/admin/'
        },
        {
            name: 'dashboard',
            link: '/admin/'
        }
    ]
    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">Dashboard</h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <div className="dashboard-card-container">
                <div className="card">
                    <div className="data-col">
                        <div className="num">{totalProducts}</div>
                        <div className="label-text">Products</div>
                    </div>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z" /></svg>,
                    </div>
                    <Link href="/admin/products" className="more-info">More Info</Link>
                </div>
                <div className="card">
                    <div className="data-col">
                        <div className="num">{totalCategories}</div>
                        <div className="label-text">Categories</div>
                    </div>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"/></svg>
                    </div>
                    <Link href="/admin/products/categories" className="more-info">More Info</Link>
                </div>
                <div className="card">
                    <div className="data-col">
                        <div className="num">{totalOrders}</div>
                        <div className="label-text">Orders</div>
                    </div>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    </div>
                    <Link href="/admin/products" className="more-info">More Info</Link>
                </div>
                <div className="card">
                    <div className="data-col">
                        <div className="num">{totalUsers}</div>
                        <div className="label-text">Users</div>
                    </div>
                    <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </div>
                    <Link href="/admin/products" className="more-info">More Info</Link>
                </div>
            </div>
        </div>
    )
}