import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

const checkDuplicate = (cart: CartState, item: CartItem): boolean => {
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
            return state.filter((item: CartItem) => {
                return item.id !== action.payload.id;
            });
        },
        incrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const itemToUpdate = state.find((item: CartItem) => item.id == action.payload.id);
            if (itemToUpdate) {
                itemToUpdate.quantity += 1;
                itemToUpdate.total = itemToUpdate.quantity * Number(itemToUpdate.price);
            }
            return state;
        },
        decrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const itemToUpdate = state.find((item: CartItem) => item.id == action.payload.id);
            if (itemToUpdate) {
                if (itemToUpdate.quantity > 1) {
                    itemToUpdate.quantity -= 1;
                    itemToUpdate.total = itemToUpdate.quantity * Number(itemToUpdate.price);
                }
            }
            return state;
        },
        clearCart: () => {
            return initialState 
        }
    }
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer;