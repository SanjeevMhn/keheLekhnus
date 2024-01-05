import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = {
    id: number | string,
    message: string,
    type: string
}

const initialState:Array<NotificationType> = [];

export const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<{message: string, type: string}>) => {
            state.push({id: Date.now(), message: action.payload.message, type: action.payload.type});
        },
        removeNotification: (state, action: PayloadAction<NotificationType>) => {
            return state.filter((item: NotificationType) => {
                return item.id !== action.payload.id
            })
        }
    }
})

export const { showNotification, removeNotification } = notificationReducer.actions;
export default notificationReducer.reducer;