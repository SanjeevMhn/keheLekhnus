import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { show: boolean} = {
	show: false
}

export const searchDialogReducer = createSlice({
	name: 'searchDialog',
	initialState,
	reducers: {
		showSearchDialog: (state, action:PayloadAction<{show: boolean}>) => {
			return {
				show: true,
			}
		},

		hideSearhDialog: (state, action: PayloadAction<{show: boolean}>) => {
			return initialState
		}
	}
});

export const { showSearchDialog, hideSearhDialog } = searchDialogReducer.actions
export default searchDialogReducer.reducer;