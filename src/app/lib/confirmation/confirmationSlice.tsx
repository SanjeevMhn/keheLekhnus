import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ConfirmationType = {
    show: boolean,
    message: string,
    onConfirm: (() => void) | null,
}

const initialState:ConfirmationType = {
    show: false,
    message: '',
    onConfirm: null
};

export const confirmationReducer = createSlice({
    name: 'confirmation',
    initialState,
    reducers: {
        showConfirm: (state, action: PayloadAction<{ message: string, onConfirm: () => void }>) => {
            return {
                ...state,
                show: true,
                message: action.payload.message,
                onConfirm: action.payload.onConfirm
            }
        },
        hideConfirm: () => {
            return initialState
        }
    }
})

export const { showConfirm, hideConfirm } = confirmationReducer.actions;
export default confirmationReducer.reducer;