'use client'

import { useDispatch, useSelector } from "react-redux";
import { PDFViewType, hidePDFViewer } from "../lib/pdfView/pdfViewSlice";
import { CartItem } from "../lib/cart/cartSlice";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OrderPDFView = () => {
	const view: PDFViewType = useSelector((state: any) => state.pdfViewer);
	const dispatch = useDispatch();

	const productTotal = (): number | undefined => {
		let total = view?.order_products?.reduce((acc: number, product: CartItem) => {
			return acc + product.total
		}, 0);

		return total
	}

	const handleHidePDF = () => {
		dispatch(hidePDFViewer());
	}

	const generatePDF = () => {
		const input: HTMLElement = document.getElementById('order-bill')!;
		html2canvas(input)
			.then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				const pdf = new jsPDF('p', 'mm', 'a4');
				let fileWidth = 210;
      	let fileHeight = (canvas.height * fileWidth) / canvas.width;		
				pdf.addImage(imgData, 'PNG', 0, 0, fileWidth, fileHeight);
				pdf.save("order-bill");
			})
	}

	const handleHidePDFOnEsc = (e: KeyboardEvent) => {
		if(e.key === 'Escape'){
			handleHidePDF();
		}
	}

	useEffect(() => {
		if (view?.show) {
			generatePDF();
			window.addEventListener('keydown',handleHidePDFOnEsc);
		}

		return () => {
			window.removeEventListener('keydown', handleHidePDFOnEsc);
		}

	}, [view])

	return (
		view?.show ? (
			<div className="order-bill-overlay">
				<div id="order-bill" className="order-bill">
					<button className="close-btn" onClick={() => handleHidePDF()}>
						<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
							<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
						</svg>
					</button>
					<div className="company-detail text-center pb-[30px]">
						<h2 className="brand-name">Sanu's Nursery</h2>
						<p className="address">Dhapakhel-24, Lalitpur</p>
					</div>
					<div className="form-layout h-auto no-border no-shadow pb-[20px] order-detail-form">
						<div className="form-row default">
							<div className="grp">
								<span className="title">Date:</span>
								<span className="data">{view?.order_date}</span>	
							</div>
						</div>
						<div className="form-row two-col">
							<div className="grp">
								<span className="title">Name:</span>
								<span className="data">{view?.user_name}</span>
							</div>
							<div className="grp">
								<span className="title">Email:</span>
								<span className="data">{view?.user_email}</span>
							</div>
						</div>
						<div className="form-row two-col">
							<div className="grp">
								<span className="title">Address:</span>
								<span className="data">{view?.user_address}</span>
							</div>
							<div className="grp">
								<span className="title">Contact:</span>
								<span className="data">{view?.user_contact}</span>
							</div>
						</div>
					</div>
					<table className="order-list-table w-full cart-table">
						<thead>
							<tr>
								<th>S.N</th>
								<th>Product</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{
								view?.order_products?.map((product: CartItem, index: number) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{product.name}</td>
										<td>{product.quantity}</td>
										<td>{product.price}</td>
										<td>{product.total}</td>
									</tr>
								))
							}	
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td>
									<div className="font-bold">
										Total
									</div>
								</td>
								<td>
									<div className="font-bold">
										{productTotal()}	
									</div>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		) : null
	)
}

export default OrderPDFView;
