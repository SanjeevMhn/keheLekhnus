'use client'
import api from "@/app/service/interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number,
    name: string,
    category: string,
    price: string,
    img: string,
    quantity: number,
}

export type CartState = Array<CartItem>

const initialState: CartState = [] || null;

export const checkDuplicate = (cart: CartState, item: CartItem): boolean => {
    let duplicate = cart.filter((ct) => {
        return ct.id == item.id
    })
    return duplicate.length > 0 ? true : false;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export type CartParams = {
    user_id: number,
    cart_item: CartItem
}

export const addToCartApi = createAsyncThunk('cart/add',async(cartData:CartParams,thunkAPI) => {
    try{
        const cartAdd = await api.post(`${baseUrl}/cart`,{
            ...cartData
        });

        const cartAddData = await cartAdd.data.cart;
        return cartAddData;
        
    }catch(err:any){
        console.error(err.response.data);
    }
})

export const getCartApi = createAsyncThunk('cart/get',async(userId: number,thunkAPI) => {
   try{
        const cart = await api.get(`${baseUrl}/cart/${userId}`);
        const cartData = await cart.data.cart;
        return cartData;
    }catch(err:any){
        console.error(err.response.data)
    } 
})

export const removeCartItemApi = createAsyncThunk('cart/delete',async(params:CartParams, thunkAPI) => {
   try{
        const delCart = await api.post(`${baseUrl}/cart/delete`,{
            ...params
        })        
        return params.cart_item;
    }catch(err:any){
        console.error(err.response.data)
    } 
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        sessionCart: (state, action: PayloadAction<Array<CartItem>>) => {
            return state = action.payload
        },
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
            }
            return state;
        },
        decrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const itemToUpdate = state.find((item: CartItem) => item.id == action.payload.id);
            if (itemToUpdate) {
                if (itemToUpdate.quantity > 1) {
                    itemToUpdate.quantity -= 1;
                }
            }
            return state;
        },
        clearCart: () => {
            return initialState 
        }
    },
    extraReducers:(builder) => {
       builder
        .addCase(addToCartApi.fulfilled, (state, action: PayloadAction<CartItem>) => {
            state.push(action.payload)
        })
        .addCase(addToCartApi.rejected,(state) => {
            return state
        })
        .addCase(getCartApi.fulfilled, (state, action:PayloadAction<Array<CartItem>>) => {
            return state = action.payload
        })
        .addCase(removeCartItemApi.fulfilled,(state,action) => {
            return state.filter((item: CartItem) => {
                return item.id !== action.payload?.id
            })
        }) 
    }
})

export const { sessionCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer;
