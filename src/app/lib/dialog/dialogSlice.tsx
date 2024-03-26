import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ComponentType, ElementType, FC } from "react";

export type DialogComponentType = (() => JSX.Element) | 
									React.ReactElement | 
									React.FC | 
									React.ReactNode | 
									null;

export type DialogState = { 
	show: boolean, 
	title: string | null,
	data?: any | null,
	component: DialogComponentType,
	size: 'sm' | 'md' | 'lg' | 'xl',
	result?: any | boolean | null
}

export const initialDialogState: DialogState = {
	show: false,
	title: null,
	data: null,
	component: null,
	size: 'md',
	result: null,
}

export const dialogReducer = createSlice({
	name: 'dialog',
	initialState: initialDialogState,
	reducers: {
		showDialog: (state: DialogState, action: PayloadAction<{ title: string, data?:any, size?: string, component: () => JSX.Element }>) => {
			return {
				...state,
				show: true,
				title: action.payload.title,
				data: action.payload?.data,
	    		component: action.payload.component,
	    		size: action.payload?.size,
			}
		},

		hideDialog: () => {
			return initialDialogState
		},

		resultDialog: () => {
			return {
				...initialDialogState,
				result: true 
			};
		},
	}
});

export const { showDialog, hideDialog, resultDialog } = dialogReducer.actions
export default dialogReducer.reducer;
