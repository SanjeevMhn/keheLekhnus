import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TUserInfo = {
    user_name: string | null,
    user_email: string | null,
    is_admin: boolean
}

export type TAuthState = {
    is_authenticated: boolean,
    user_token: string | null,
    user_info: TUserInfo | null
}

export const initialAuthState: TAuthState = {
    is_authenticated: false,
    user_token: null,
    user_info: null
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state: TAuthState, action: PayloadAction<string>) => {
            return {
                ...state,
                is_authenticated: true,
                user_token: action.payload
            }
        },

        setUserData: (state: TAuthState, action: PayloadAction<TUserInfo>) => {
            return {
                ...state,
                user_info: action.payload
            }
        },

        logout: () => {
            return initialAuthState;
        }
    }
})

export const { login , setUserData, logout } = authReducer.actions;
export default authReducer.reducer;