'use client'

import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import { Columns, PagerConfig } from "@/app/(components)/data-table";
import RecentOrdersGrid from "@/app/(components)/recent-orders-grid";
import api from "@/app/service/interceptor/interceptor";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const crumbs: Array<TBreadCrumb> = [
    {
      name: 'admin',
      link: '/admin/'
    },
    {
      name: 'orders',
      link: '/admin/orders'
    }
  ]

  const columns: Array<Columns> = [
    {
      title: 'Order Id',
      field: 'order_id',
      hidden: true,
    },
    {
      title: 'Order Number',
      field: 'order_number',
    },
    {
      title: 'Order Date',
      field: 'order_date'
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
      title: 'Order Total',
      field: 'order_total'
    },
    {
      title: 'Payment Type',
      field: 'payment_type'
    },
    {
      title: 'User Name',
      field: 'user_name'
    },
    {
      title: 'User Email',
      field: 'user_email'
    },
    {
      title: 'User Type',
      field: 'user_type'
    },
    {
      title: 'User Contact',
      field: 'user_contact'
    },
    {
      title: 'Delivery Address',
      field: 'delivery_address'
    },

  ]

  const [orders, setOrders] = useState<any>([]);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const ordersFetch = useRef<boolean>(false);
  const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
    pageSize: 5,
    currentPage: 1,
    totalPages: 1
  })

  const getOrderStatus = async (status: string, page = 1, pageSize = 5) => {
    try {

      const response = await api.get(`http://localhost:8080/api/v1/orders/status/${status}?page=${page}&pageSize=${pageSize}`);
      const data = await response.data;
      setOrders(data.orders);
      setPagerConfig({
        pageSize: data.pageSize,
        currentPage: data.currentPage,
        totalPages: data.totalPages
      })

    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!ordersFetch.current) {
      getOrderStatus('PENDING');
    }
    return () => {
      ordersFetch.current = true;
    }
  }, [])


  useEffect(() => {
    if (orderStatus !== '') {
      getOrderStatus(orderStatus)
    }
    return () => {
    }
  }, [orderStatus])

  const handlePagination = (page: number) => {
    if (orderStatus === '') {
      getOrderStatus('PENDING', page)
    } else {
      getOrderStatus(orderStatus, page)
    }
  }

  const customElement =
    <div className="checkbox-container flex gap-2 pr-4">
      <div className="grp">
        <input type="radio" name="status" id="pending" onChange={() => setOrderStatus("PENDING")} defaultChecked={true} />
        <label htmlFor="pending" className="data status PENDING">Pending</label>
      </div>
      <div className="grp">
        <input type="radio" name="status" id="completed" onChange={() => setOrderStatus('COMPLETED')} checked={orderStatus === 'COMPLETED'} />
        <label htmlFor="completed" className="data status COMPLETED">Completed</label>
      </div>
      <div className="grp">
        <input type="radio" name="status" id="cancelled" onChange={() => setOrderStatus('CANCELLED')} checked={orderStatus === 'CANCELLED'} />
        <label htmlFor="cancelled" className="data status CANCELLED">Cancelled</label>
      </div>
    </div>

  return (
    <div className="grid-container">
      <div className="header">
        <h2 className="page-title">Order List</h2>
        <BreadCrumb crumbs={crumbs} />
      </div>
      <RecentOrdersGrid
        propPagerConfig={pagerConfig}
        propData={orders}
        customElement={customElement}
        propColumns={columns}
        onPropPaginate={handlePagination} />
    </div>
  )
}
