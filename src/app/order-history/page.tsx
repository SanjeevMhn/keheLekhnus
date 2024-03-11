'use client'

import { useEffect, useRef, useState } from "react"
import api from "../service/interceptor/interceptor";
import { TAuthState } from "../lib/auth/authSlice";
import { useSelector } from "react-redux";
import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb";
import RecentOrdersGrid from "../(components)/recent-orders-grid";
import { Columns } from "../(components)/data-table";

export default function Page() {

  const orderHistoryFetched = useRef<boolean>(false);
  const authUser: TAuthState = useSelector((state: any) => state.auth);
  const [orders, setOrders] = useState<any>({});

  useEffect(() => {
    if (!orderHistoryFetched.current) {
      getOrderHistory();
    }
    return () => {
      orderHistoryFetched.current = true;
    }
  })

  const getOrderHistory = async () => {
    try {
      // const order = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${authUser.user_info?.user_id}`);
      const order = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/user/27`);
      if (order.status == 200) {
        let ordersMapped: any = {};
        order.data.orders.map((ord: any) => {
          if (!ordersMapped.hasOwnProperty(ord.order_number)) {
            ordersMapped[ord.order_number] = [];
            ordersMapped[ord.order_number].push(ord)
          }
        })
        setOrders(ordersMapped);
      }

    } catch (err: any) {
      console.error(err);

    }
  }

  const crumbs: Array<TBreadCrumb> = [
    {
      link: '/',
      name: 'home'
    },
    {
      link: '/order-history',
      name: 'order-history'
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
      hidden: true,
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
      title: 'Payment Type',
      field: 'payment_type'
    }
  ]


  return (
    <div className="main-wrapper">

      <div className="grid-container">
        <div className="header">
          <h2 className="page-title">
            Order History
          </h2>
          <BreadCrumb crumbs={crumbs} />
        </div>
        {
          orders.length == 0 ? (
            <p>No orders found</p>
          ) : (
            <section className="pt-[15px] order-history-container">
              {
                Object.keys(orders).map((ord: string, index: any) => (
                  <article className="order-history-item" key={index}>
                    <div className="order-history-details p-[10px] text-[17px]">
                      <div className="order-number">
                        <span className="font-semibold">Order</span>: &nbsp;{ord}
                      </div>
                      <div className="order-date">
                        <span className="font-semibold">Order Date</span>: &nbsp;{orders[ord][0].order_date}
                      </div>
                      <div className={`status ${orders[ord][0].order_status}`}>{orders[ord][0].order_status}</div>
                      <div className="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                      </div>
                    </div>
                    {/*
                      <RecentOrdersGrid
                        propTitle={'Orders List'}
                        propData={orders[ord]}
                        propColumns={columns} />
                    */}
                  </article>
                ))
              }
            </section>
          )
        }
      </div>
    </div>
  )
}
