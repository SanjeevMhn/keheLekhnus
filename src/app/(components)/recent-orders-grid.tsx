'use client'

import { FC, useEffect, useRef, useState } from "react"
import api from "../service/interceptor/interceptor";
import DataTable, { Columns, PagerConfig } from "./data-table";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showConfirm } from "../lib/confirmation/confirmationSlice";
import { showNotification } from "../lib/notifications/notificationSlice";

type RecectOrdersGridProps = {
    propPagerConfig?: PagerConfig,
    propData?: any,
    propStatus?: any,
    customElement?: any,
    propColumns?: Array<Columns>,
    onPropPaginate: (page: number) => void
}

const RecentOrdersGrid: FC<RecectOrdersGridProps> = ({ propPagerConfig, propData, customElement, propColumns, propStatus, onPropPaginate }) => {
    const [orders, setOrders] = useState<Array<any>>([]);
    const [orderStatus, setOrderStatus] = useState<string>('');
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    })
    const ordersFetched = useRef<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (!ordersFetched.current) {
        if (propStatus !== '') {
            setOrderStatus(propStatus)
            getOrders(propStatus, 1);
        } else {
            setOrderStatus('PENDING');
            if (!ordersFetched.current) {
                getOrders('PENDING', 1);
            }
        }
        return () => {
            ordersFetched.current = true;
        }
    }, [propStatus])

    const getOrders = async (status = 'PENDING', page = pagerConfig.currentPage, pageSize = pagerConfig.pageSize) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/orders/status/${status}?page=${page}&pageSize=${pageSize}`);
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
            getOrders(orderStatus, page);
        }
    }

    const router = useRouter();

    const handleEdit = (id: number) => {
        router.push(`/admin/orders/detail/${id}`);
    }

    const handleDelete = (id: number) => {
        dispatch(showConfirm({
            message: 'Delete this order?',
            onConfirm: async () => {
                try {
                    const res = await api.delete(`http://localhost:8080/api/v1/orders/id/${id}`);
                    if (res.status == 200) {
                        dispatch(showNotification({
                            message: 'Order deleted successfully',
                            type: 'success'
                        }));
                        getOrders(propStatus);
                    }
                } catch (e) {
                    console.error(e);
                }
            },
        }))
    }



    return (
        <DataTable
            columns={propColumns && propColumns.length !== 0 ? propColumns : columns}
            data={propData && propData.length !== 0 ? propData : orders}
            title='Recent Orders'
            customElement={customElement}
            pagerConfig={propPagerConfig ? propPagerConfig : pagerConfig}
            onPaginate={handlePaginate}
            onEditAction={handleEdit}
            onDeleteAction={handleDelete}
        />
    )
}

export default RecentOrdersGrid;
