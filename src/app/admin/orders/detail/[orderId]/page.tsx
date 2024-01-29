'use client'

import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import DataTable, { Columns, PagerConfig } from "@/app/(components)/data-table";
import { showNotification } from "@/app/lib/notifications/notificationSlice";
import api from "@/app/service/interceptor/interceptor";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";

export default function Page({ params }: { params: { orderId: number } }) {

	const [orderDetail, setOrderDetail] = useState<{ order: any | null, orderItems: Array<any> | null }>({
		order: null,
		orderItems: null
	})
	const [updatedOrderDetail, setUpdateOrderDetail] = useState<any | null>(null)
	const [paymentType, setPaymentType] = useState<any | null>([]);
	const orderDetailFetched = useRef<boolean>(false);
	const pagerConfig: PagerConfig = {
		currentPage: 1,
		pageSize: 5,
		totalPages: 1
	}
	const dispatch = useDispatch();

	useEffect(() => {
		if (!orderDetailFetched.current) {
			getOrderDetail(params.orderId);
			getPaymentTypes();
		}

		return () => {
			orderDetailFetched.current = true;
		}
	})

	const getPaymentTypes = async () => {
		try {
			const response = await api.get('http://localhost:8080/api/v1/orders/paymentTypes');
			const data = await response.data;
			setPaymentType(data.paymentTypes);
		} catch (e) {
			console.error(e)
		}
	}

	const getOrderDetail = async (id: number) => {
		try {
			const response = await api.get(`http://localhost:8080/api/v1/orders/id/${id}`);
			const data = await response.data;
			setOrderDetail({
				order: data.order,
				orderItems: data.orderItems
			})
		} catch (e) {
			console.error(e)
		}
	}

	const crumbs: Array<TBreadCrumb> = [
		{
			name: 'admin',
			link: '/admin'
		},
		{
			name: 'orders',
			link: '/admin/orders',
		},
		{
			name: 'detail',
			link: `/admin/orders/detail/${params.orderId}`
		}
	]

	const orderStatus = [
		'PENDING',
		'COMPLETED',
		'CANCELLED'
	];

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
			title: 'inStock',
			field: 'prod_inStock'
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

	const handleUpdateDetail = (e:ChangeEvent<any>) => {
		let update = e.target.value;
		let element = e.target.name;

		if(update !== null && update !== ''){
			setUpdateOrderDetail({
				...updatedOrderDetail,
				[element]: update
			})
		}
	}

	const handleOrderDetailSubmit = async(e: FormEvent) => {
		e.preventDefault();
		if(Object.keys(updatedOrderDetail).length !== 0){
			const response = await api.patch(`http://localhost:8080/api/v1/orders/id/${params.orderId}`,updatedOrderDetail);
			if(response.status == 200){
				dispatch(showNotification({
					message: "Order Detail Updated!",
					type: "success"
				}))
				getOrderDetail(params.orderId);
			}
		}
	}

	return (
		<div className="grid-container">
			<div className="header">
				<h2 className="page-title">Order Detail</h2>
				<BreadCrumb crumbs={crumbs} />
			</div>
			<div className="order-detail-grid-container ">
				<div className="order-detail grid-card">
					{
						orderDetail.order !== null ? (
							<form className="form-layout no-border no-shadow floating-label" onSubmit={handleOrderDetailSubmit}>
								<div className="form-row four-col">
									<div className="form-group">
										<label htmlFor="order_number" className="form-label">Order Number</label>
										<input type="text" name="order_number" id="order_number" className="form-control" value={orderDetail.order.order_number} readOnly />
									</div>
									<div className="form-group">
										<label htmlFor="order_date" className="form-label">Order Date</label>
										<input type="date" name="order_date" id="order_date" className="form-control" value={orderDetail.order.order_date} readOnly />
									</div>
									<div className="form-group">
										<label htmlFor="order_total" className="form-label">Order Total</label>
										<input type="text" name="order_total" id="order_totlal" className="form-control" value={orderDetail.order.order_total} readOnly />
									</div>
									<div className="form-group">
										<label htmlFor="order_status" className="form-label">Order Status</label>
										<select name="order_status" id="order_status" className="form-control" onChange={handleUpdateDetail}>
											{
												orderStatus.map((status: any, index: number) => (
													<option value={status} key={index} selected={status === orderDetail.order.order_status}>
														{status}
													</option>
												))
											}
										</select>
									</div>
								</div>
								<div className="form-row four-col">
									<div className="form-group">
										<label htmlFor="delivery_address" className="form-label">Delivery Address</label>
										<input type="text" name="delivery_address" id="delivery_address" className="form-control" defaultValue={orderDetail.order.delivery_address} onChange={handleUpdateDetail} />
									</div>
									<div className="form-group">
										<label htmlFor="user_name" className="form-label">User Name</label>
										<input type="text" name="user_name" id="user_name" className="form-control" defaultValue={orderDetail.order.user_name} onChange={handleUpdateDetail} />
									</div>
									<div className="form-group">
										<label htmlFor="user_email" className="form-label">User Email</label>
										<input type="text" name="user_email" id="user_email" className="form-control" defaultValue={orderDetail.order.user_email} onChange={handleUpdateDetail} />
									</div>
									<div className="form-group">
										<label htmlFor="user_contact" className="form-label">User Contact</label>
										<input type="text" name="user_contact" id="user_name" className="form-control" defaultValue={orderDetail.order.user_contact} onChange={handleUpdateDetail} />
									</div>
								</div>
								<div className="form-row four-col">
									<div className="form-group">
										<label htmlFor="payment_status" className="form-label">Payment Status</label>
										{
											<select name="payment_status" id="payment_status" className="form-control" onChange={handleUpdateDetail}>
												{
													orderStatus.map((status: any, index: number) => (
														<option value={status} selected={status == orderDetail.order.payment_status} key={index}>{status}</option>
													))
												}
											</select>

										}
									</div>
									<div className="form-group">
										<label htmlFor="payment_type" className="form-label">Payment Type</label>
										{
											paymentType.length !== 0 ? (
												<select name="payment_type" id="payment_type" className="form-control" onChange={handleUpdateDetail}>
													{
														paymentType.map((payment: any, index: number) => (
															<option value={payment.payment_id} key={index} selected={payment.payment_type == orderDetail.order.payment_type}>{payment.payment_type}</option>
														))
													}
												</select>
											) : null

										}
									</div>

								</div>
								<div className="form-row four-col flex justify-end">
									<div className="form-group flex items-end">
										<button type="submit" className="btn-primary">Update</button>
									</div>
								</div>
							</form>
						) : null
					}

				</div>
				<div className="order-items grid-card">
					{
						orderDetail.orderItems !== null ? (
							<DataTable
								title='Order Items List'
								data={orderDetail.orderItems}
								columns={gridCol}
								pagerConfig={pagerConfig} />
						) : null
					}
				</div>
			</div>
		</div>
	)
}