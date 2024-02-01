'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TAuthState } from "../lib/auth/authSlice";
import SideNav from "./sidenav";

const ProtectedRoute = ({children}:{children: React.ReactNode}) => {
    const router = useRouter()
    const adminUser:TAuthState = useSelector((state: any) => state.auth);
    useEffect(() => {
        if(!adminUser.user_info?.is_admin){
            router.push('/');
        }
    },[adminUser, router])
    return (
        <div className="wrapper has-sidenav">

            <SideNav />
            {children}
        </div>
    )
}

export default ProtectedRoute;