import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cart/cartSlice";

export type PDFViewType = {
	show: boolean,
	user_name: string | null,
	user_address: string | null,
	user_email: string | null,
	user_contact: string | null,
	order_date: string | null,
	order_products: Array<CartItem> | null,
	order_total: number | null
}


const initialPDFViewState: PDFViewType = {
	show: false,
	user_name: null,
	user_address: null,
	user_email: null,
	user_contact: null,
	order_date: null,
	order_products: null,
	order_total: null,
};

type PayloadType = Omit<PDFViewType, "show">;


export const pdfViewReducer = createSlice({
	name: 'pdfView',
	initialState: initialPDFViewState,
	reducers: {
		showPDFViewer: (state: PDFViewType, action: PayloadAction<PayloadType>) => {
			return {
				...state,
				show: true,
				...action.payload
			}
		},

		hidePDFViewer: () => {
			return initialPDFViewState
		}
	}
})


export const { showPDFViewer, hidePDFViewer } = pdfViewReducer.actions;
export default pdfViewReducer.reducer;