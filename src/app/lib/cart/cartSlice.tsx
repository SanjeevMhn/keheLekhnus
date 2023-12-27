import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@reduxjs/toolkit/query";

export type CartItem = {
    id: number,
    name: string,
    category: string,
    price: string,
    img: string,
    quantity: number,
    total: number 
}

type CartState = Array<CartItem> 

const initialState: CartState = [];

const checkDuplicate = (cart: CartState, item:CartItem):boolean => {
    let duplicate = cart.filter((ct) => {
        return ct.id == item.id 
    })

    return duplicate.length > 0 ? true : false;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            !checkDuplicate(state, action.payload) ? state.push(action.payload) : ''
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            return state.filter((item:CartItem) => {
                return item.id !== action.payload.id;
            });
        },
    }
}) 

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer;