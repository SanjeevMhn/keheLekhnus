'use client'

import { useEffect, useRef, useState } from "react"
import api from "../service/interceptor/interceptor";
import { TAuthState } from "../lib/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb";
import DataTable, { Columns, PagerConfig } from "../(components)/data-table";
import Link from "next/link";
import { showConfirm } from "../lib/confirmation/confirmationSlice";
import { showNotification } from "../lib/notifications/notificationSlice";

export default function Page() {

  const orderHistoryFetched = useRef<boolean>(false);
  const authUser: TAuthState = useSelector((state: any) => state.auth);
  const [orders, setOrders] = useState<Array<any>>([]);

  useEffect(() => {
    if (authUser.user_info !== null) {
      getOrderHistory();
    }

  }, [authUser.user_info])

  const getOrderHistory = async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/user/order-history/${authUser.user_info?.user_id}`);
      const data = await response.data;
      setOrders(data.orders);
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

  const [orderActive, setOrderActive] = useState<number | null>(null)
  const handleGetOrderData = (id: number) => {
    if (orderActive == null) {
      setOrderActive(id);
      getOrderItems(id);
    } else if (orderActive == id) {
      setOrderActive(null);
    } else if (orderActive !== id) {
      setOrderActive(id);
      getOrderItems(id);
    } else {
      setOrderActive(null);
    }
  }


  const [orderItems, setOrderItems] = useState<Array<any>>([]);
  const pagerConfig: PagerConfig = {
    currentPage: 1,
    pageSize: 5,
    totalPages: 1
  }

  const getOrderItems = async (orderId: number) => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/id/items/${orderId}`);
      const data = await response.data;
      setOrderItems(data.items)
    } catch (err: any) {
      console.error(err)
    }
  }

  const gridCol: Array<Columns> = [
    {
      title: 'id',
      field: 'prod_id',
      hidden: true,
    },
    {
      title: 'image',
      field: 'prod_img'
    },
    {
      title: 'name',
      field: 'prod_name'
    },
    {
      title: 'category',
      field: 'prod_category'
    },
    {
      title: 'price',
      field: 'prod_price'
    },
    {
      title: 'quantity',
      field: 'prod_quantity'
    }
  ]

  const dispatch = useDispatch<any>();
  const handleCancelOrder = (orderId: any) => {
    dispatch(showConfirm({
      message: 'Do you want to cancel this order?',
      onConfirm: async () => {
        try {
          const response = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/orders/id/${orderId}`,{
            order_status: 'CANCELLED'
          });
          if (response.status == 200) {
            dispatch(showNotification({
              message: 'Order cancelled successfully',
              type: 'success'
            }))
            getOrderHistory();
          }
        } catch (err: any) {
          console.error(err)
        }
      }
    }))
  }

  return (
    <div className="main-wrapper px-5 lg:px-0">
      <BreadCrumb crumbs={crumbs} />
      {
        orders.length == 0 ? (
          <div className="empty-cart-container">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
              </svg>
            </div>
            <h2 className="info-text px-4 text-center">You have not placed an order yet</h2>
            <Link href={`/products/`} className="btn go-to-shopping">
              continue shopping
            </Link>
          </div>) : (
          <section className="pt-[15px] order-history-container">
            {
              orders.map((ord: any, index: any) => (
                <article className={`order-history-item ${orderActive == ord.order_id ? 'active' : ''}`} key={index}>
                  <div className="order-history-details p-[10px] text-[17px]">
                    <div className="order-number">
                      <span className="font-semibold">Order</span>: &nbsp;{ord.order_number}
                    </div>
                    <div className="order-date">
                      <span className="font-semibold">Order Date</span>: &nbsp;{ord.order_date}
                    </div>
                    {
                      ord.order_status === 'PENDING' ? (
                        <button className="icon-container cancel-order" onClick={() => handleCancelOrder(ord.order_id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 448 512">
                            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                          </svg>
                        </button>
                      ) : null
                    }
                    <div className={`status ${ord.order_status}`}>{ord.order_status}</div>
                    <button className="show-table icon-container" onClick={() => handleGetOrderData(ord.order_id)}>
                      {
                        orderActive == ord.order_id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                        )
                      }
                    </button>
                  </div>
                  {
                    orderActive == ord.order_id ? (
                      <DataTable
                        title={'Order Items'}
                        data={orderItems}
                        pagerConfig={pagerConfig}
                        columns={gridCol}
                        showActionCol={ord.order_status === 'CANCELLED' || ord.order_status === 'COMPLETED' ? false : true}
                      />
                    ) : null
                  }
                </article>
              ))
            }
          </section>
        )
      }
    </div>
  )
}
