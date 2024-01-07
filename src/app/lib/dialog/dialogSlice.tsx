import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type DialogState = { 
	show: boolean, 
	title: string | null,
	component?: (() => JSX.Element) | null 
}

export const initialDialogState: DialogState = {
	show: false,
	title: null,
	component: null
}

export const dialogReducer = createSlice({
	name: 'dialog',
	initialState: initialDialogState,
	reducers: {
		showDialog: (state: DialogState, action: PayloadAction<{ title: string, component: () => JSX.Element }>) => {
			return {
				show: true,
				title: action.payload.title,
				component: action.payload.component
			}
		},

		hideDialog: () => {
			return initialDialogState
		}
	}
});

export const { showDialog, hideDialog } = dialogReducer.actions
export default dialogReducer.reducer;