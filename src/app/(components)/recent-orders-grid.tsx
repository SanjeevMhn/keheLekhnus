'use client'

import { FC, useEffect, useRef, useState } from "react"
import api from "../service/interceptor/interceptor";
import DataTable, { Columns, PagerConfig } from "./data-table";

const RecentOrdersGrid:FC<{propColumns?: Array<Columns>}> = ({ propColumns }) => {
    const [orders, setOrders] = useState<Array<any>>([]);
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    })
    const ordersFetched = useRef<boolean>(false);

    useEffect(() => {
        if(!ordersFetched.current){
            getOrders();
        }
        return () => {
            ordersFetched.current = true;
        }
    },[])

    const getOrders = async (page=pagerConfig.currentPage,pageSize=pagerConfig.pageSize ) => {
        try{
            const response = await api.get(`http://localhost:8080/api/v1/orders?page=${page}&pageSize=${pageSize}`);
            const data = await response.data;
            setOrders(data.orders);
            setPagerConfig({
                currentPage: data.currentPage,
                pageSize: data.pageSize,
                totalPages: data.totalPages
            })
        }catch(e){
            console.error(e)
        }
    }

    const columns: Array<Columns> = [
        {
            title: 'Order Id',
            field: 'order_id',
            hidden: true,
        },
        {
            title: 'Order Number',
            field: 'order_number',
            hidden: true,
        },
        {
            title: 'Order Date',
            field: 'order_date'
        },
        {
            title: 'User Name',
            field: 'user_name'
        },
        {
            title: 'Order Status',
            field: 'order_status'
        },
        {
            title: 'Payment Status',
            field: 'payment_status' 
        },
        {
            title: 'Payment Type',
            field: 'payment_type'
        }
    ]

    const handlePaginate = (page: number) => {
        getOrders(page);
    } 

    return (
        <DataTable 
            columns={propColumns && propColumns.length !== 0 ? propColumns : columns} 
            data={orders}
            title='Recent Orders'
            pagerConfig={pagerConfig}
            onPaginate={handlePaginate}
             />
    )
}

export default RecentOrdersGrid;