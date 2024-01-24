'use client'

import { FC, useEffect, useRef, useState } from "react"
import api from "../service/interceptor/interceptor";
import DataTable, { Columns, PagerConfig } from "./data-table";

type RecectOrdersGridProps = {
    propPagerConfig?: PagerConfig, 
    propData?: any, 
    customElement?: any, 
    propColumns?: Array<Columns>, 
    onPropPaginate: (page: number) => void
}

const RecentOrdersGrid: FC<RecectOrdersGridProps> = ({ propPagerConfig, propData, customElement, propColumns, onPropPaginate }) => {
    const [orders, setOrders] = useState<Array<any>>([]);
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    })
    const ordersFetched = useRef<boolean>(false);

    useEffect(() => {
        if (!ordersFetched.current) {
            getOrders();
        }
        return () => {
            ordersFetched.current = true;
        }
    }, [])

    const getOrders = async (page = pagerConfig.currentPage, pageSize = pagerConfig.pageSize) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/orders?page=${page}&pageSize=${pageSize}`);
            const data = await response.data;
            setOrders(data.orders);
            setPagerConfig({
                currentPage: data.currentPage,
                pageSize: data.pageSize,
                totalPages: data.totalPages
            })
        } catch (e) {
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
            field: 'order_status',
            customHTML: "<div class='status {0}'>{0}</div>"
        },
        {
            title: 'Payment Status',
            field: 'payment_status',
            customHTML: "<div class='status {0}'>{0}</div>"
        },
        {
            title: 'Payment Type',
            field: 'payment_type'
        }
    ]

    const handlePropPaginate = (page: number) => {
        onPropPaginate(page)
    }

    const handlePaginate = (page: number) => {
        if (propData && propData.length !== 0) {
            handlePropPaginate(page)
        } else {
            getOrders(page);
        }
    }

    

    return (
        <DataTable 
            columns={propColumns && propColumns.length !== 0 ? propColumns : columns} 
            data={propData && propData.length !== 0 ? propData : orders}
            title='Recent Orders'
            customElement={customElement}
            pagerConfig={propPagerConfig ? propPagerConfig : pagerConfig}
            onPaginate={handlePaginate}
        />
    )
}

export default RecentOrdersGrid;