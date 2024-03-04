import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TUserInfo = {
    user_id: any | null,
    user_name: string | null | undefined,
    user_email: string | null | undefined,
    user_img?: string | null | undefined,
    user_contact?: string | null | undefined,
    user_address?: string | null | undefined,
    authProvider: string | null | undefined,
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

        setNewToken: (state: TAuthState, action: PayloadAction<string>) => {
            return {
                ...state,
                is_authenticated: true,
                user_token: action.payload
            }
        },

        logout: () => {
            return initialAuthState;
        }
    }
})

export const { login , setUserData, setNewToken, logout } = authReducer.actions;
export default authReducer.reducer;
