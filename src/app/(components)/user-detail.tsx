import { FC, useEffect, useRef, useState } from "react";
import api from "../service/interceptor/interceptor";
import { useDispatch, useSelector } from "react-redux";
import DataTable, { Columns, PagerConfig } from "./data-table";
import Link from "next/link";
import { hideDialog } from "../lib/dialog/dialogSlice";


const UserDetail: FC = () => {

	const [orders, setOrders] = useState<Array<any>>([]);
	const user = useSelector((state: any) => state.dialog);
	const dispatch = useDispatch<any>();
	const orderHistoryFetched = useRef<boolean>(false);

	useEffect(() => {
		if(!orderHistoryFetched.current){
			getOrderHistory();
		}

		return () => {
			orderHistoryFetched.current = true;
		}

	}, [])

	const getOrderHistory = async () => {
		try {
			const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/user/order-history/${user.data?.user_id}`);
			const data = await response.data;
			setOrders(data.orders);
		} catch (err: any) {
			console.error(err);
		}
	}

	const [tabActive, setTabActive] = useState<string>("profile");
	const tabItems: Array<string> = ["profile", "orders"]

	const gridCol: Array<Columns> = [
		{
			title: 'id',
			field: 'order_detail_id',
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

	return (
		<>
			<ul className="tabs">
				{
					tabItems.map((tab: string, index: number) => (
						<li className={`tab-item ${tab === tabActive ? 'active' : ''}`} onClick={() => setTabActive(tab)} key={index}>{tab}</li>
					))
				}
			</ul>
			{tabActive === 'profile' ? (
				<div className="entry-form-container w-full !shadow-none !p-0">
					<div className="product-img-container !h-[330px] !max-w-[350px]">
						<div className="img-container">
							{
								user.data?.user_img !== null ? (
									<img src={user.data?.user_img} alt="" />
								) : (
									<p className="no-img">No Image</p>
								)
							}
						</div>
					</div>
					<form className="form entry-form form-layout no-shadow !h-auto">
						<div className="form-body !h-auto">
						<div className="form-row two-col">
							<div className="form-group">
								<label htmlFor="joined-date" className="form-label">Joined Date</label>
								<input type="text" name="joined_date" id="date" className="form-control" defaultValue={user.data?.created_at.split(' ')[0] || ''} readOnly />
							</div>
						</div>
							<div className="form-row two-col">
								<div className="form-group">
									<label htmlFor="name" className="form-label">Name</label>
									<input type="text" name="user_name" id="name" className="form-control" defaultValue={user.data?.user_name || ''} readOnly />
								</div>
								<div className="form-group">
									<label htmlFor="email" className="form-label">Email</label>
									<input type="email" name="user_email" id="email" className="form-control" defaultValue={user.data?.user_email || ''} readOnly />
								</div>
							</div>
							<div className="form-row two-col">
								<div className="form-group">
									<label htmlFor="contact" className="form-label">Contact</label>
									<input type="text" name="user_contact" id="contact" className="form-control" defaultValue={user.data?.user_contact || ''} readOnly />
								</div>
								<div className="form-group">
									<label htmlFor="address" className="form-label">Address</label>
									<input type="text" name="user_address" id="address" className="form-control" defaultValue={user.data?.user_address || ''} readOnly />
								</div>
							</div>
							<div className="form-row two-col">
								<div className="form-group">
									<label htmlFor="auth-provider" className="form-label">Auth Provider</label>
									<input type="text" name="auth-provider" id="auth-provideer" className="form-control" defaultValue={user.data?.authProvider || ''} readOnly />
								</div>
							</div>
						</div>
					</form>
				</div>

			) : (

				<>
					{orders.length > 0 ? (
						<div className="orders-list order-history-container  w-full">
							{
								orders.map((ord: any) => (
									<Link href={`orders/detail/${ord.order_id}`} onClick={() => dispatch(hideDialog())}>
										<article className={`order-history-item mb-[10px]`}>
											<div className="order-history-details p-[10px] text-[17px]">
												<div className="order-number">
													<span className="font-semibold">Order</span>: &nbsp;{ord.order_number}
												</div>
												<div className="order-date">
													<span className="font-semibold">Order Date</span>: &nbsp;{ord.order_date}
												</div>

												<div className={`status ${ord.order_status}`}>{ord.order_status}</div>
											</div>
										</article>

									</Link>
								))
							}
						</div>) : (
						<h2 className="py-[20px]">No orders available.</h2>
					)}
				</>


			)}
		</>
	)

}


export default UserDetail;
