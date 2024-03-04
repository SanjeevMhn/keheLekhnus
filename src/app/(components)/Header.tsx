"use client"
import Link from "next/link";
import CartMenuItem from "./cart-menu-item";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector, useStore } from "react-redux";
import { showDialog } from "../lib/dialog/dialogSlice";
import SearchProducts from "./search-products";
import LoginForm from "./login-form";
import { TAuthState, logout, setUserData } from "../lib/auth/authSlice";
import { showConfirm } from "../lib/confirmation/confirmationSlice";
import { showNotification } from "../lib/notifications/notificationSlice";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import api from "../service/interceptor/interceptor";
import AdminNotify from "./admin-notify";
import ResponsiveNav from "./responsive-nav";
import SideNav from "./sidenav";
import { googleLogout } from "@react-oauth/google";
import { CartItem, getCartApi, sessionCart } from "../lib/cart/cartSlice";

export default function Header() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathName = usePathname();
  const dispatch = useDispatch<any>();
  const authUser: TAuthState = useSelector((state: any) => state.auth)
  //const store = useStore();
  const router = useRouter();
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const handleShowSearchDialog = () => {
    dispatch(showDialog({ title: 'Search Products', component: SearchProducts }));
  };

  const handleShowLoginDialog = () => {
    dispatch(showDialog({ title: 'Login', component: LoginForm }));
  }

  const handleLogout = async () => {
    // if(session?.user){
    //   signOut();
    //   return;
    // }
    try {
      const logoutConfig: AxiosRequestConfig = {
        method: 'post',
        url: `${baseUrl}/auth/logout`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${authUser.user_token}`
        },
      }
      dispatch(showConfirm({
        message: 'Do you want to logout?',
        onConfirm: async () => {
          if (authUser.user_info?.authProvider === 'google') {
            googleLogout();
            sessionStorage.clear();
            window.location.href = '/';
            return;
          }
          const logoutRes = await axios(logoutConfig);
          if (logoutRes.status == 200) {
            dispatch(logout());
            dispatch(showNotification({
              message: 'User Logged Out',
              type: 'success'
            }));
            // router.push('');
            // window.location.reload();
            window.location.href = '/';
          }
        }
      }))



    } catch (e: any) {
      console.error(e);
    }

  }

  const userChecked = useRef<boolean>(false);

  useEffect(() => {
    if (!userChecked.current) {
      checkUser();
    }

    return () => {
      userChecked.current = true;
    }
  }, [])

  const checkUser = async () => {
    if (!authUser.is_authenticated) {
      const checkUserReq = await api.get(`${baseUrl}/auth/me`);
      const checkUserRes = checkUserReq.data;
      if (checkUserRes.user[0].user_role == 'admin') {
        router.push('/admin');
      }
      dispatch(setUserData({
        user_id: checkUserRes.user[0].user_id,
        user_name: checkUserRes.user[0].user_name,
        user_email: checkUserRes.user[0].user_email,
        user_img: checkUserRes.user[0].user_img,
        authProvider: checkUserRes.user[0].authProvider,
        user_contact: checkUserRes.user[0].user_contact,
        user_address: checkUserRes.user[0].user_address,
        is_admin: checkUserRes.user[0].user_role == 'admin' ? true : false,
      }))


      if (checkUserRes.user[0].user_role !== 'admin') {
        dispatch(getCartApi(checkUserRes.user[0].user_id));
      } else {
        let memoryCart: Array<CartItem> = JSON.parse(sessionStorage.getItem('cart')!);
        if (memoryCart.length > 0) {
          dispatch(sessionCart(memoryCart));
        }
      }


    }

  }

  return (
    <nav className={`nav-primary px-[15px] md:px-[40px] shadow-xl sticky top-0 bg-[var(--base-color)] z-40 ${authUser.user_info?.is_admin ? 'admin-nav' : ''}`}>
      <div className={`main-navigation ${!authUser.user_info?.is_admin ? 'main-wrapper' : ''}`}>
        <Link href="/" className={`brand-name`}>
          Sanu&apos;s Nursery
        </Link>
        <ul className="nav-list main-nav-list">
          {
            !authUser.user_info?.is_admin ? (
              <>
                <li className="nav-item">
                  <Link
                    href="/"
                    className={`nav-link ${pathName === "/" ? "active" : ""}`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/products/"
                    className={`nav-link ${pathName === "/products" ? "active" : ""}`}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/contact"
                    className={`nav-link ${pathName === "/contact" ? "active" : ""}`}
                  >
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/about"
                    className={`nav-link ${pathName === "/about" ? "active" : ""}`}
                  >
                    About
                  </Link>
                </li>
              </>
            ) : null
          }

        </ul>
        <ul className="nav-list">
          {
            authUser.user_info?.is_admin ? (
              <AdminNotify />
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => handleShowSearchDialog()}
                  >
                    <div className="icon-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                      >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                      </svg>
                    </div>
                  </button>
                </li>
                <CartMenuItem />
              </>
            )
          }

          <li className="nav-item ml-5 user-state">
            {
              authUser.user_info !== null ? (
                <button className="btn-outline user-btn font-medium text-md flex items-center gap-2">
                  <span className="img-container bg-blue-400">
                    {
                      authUser.user_info.user_img ? (
                        <img src={authUser.user_info.user_img} />
                      ) : null
                    }
                  </span>
                  <span className="user-name">
                    {authUser.user_info?.user_name}
                  </span>
                  <span className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </span>
                  <ul className="dropdown-list">
                    <li className="dropdown-item">
                      <Link href="/profile/" className="flex">
                        Profile
                      </Link>
                    </li>
                    <li className="dropdown-item">Settings</li>
                    <li className="dropdown-item" onClick={handleLogout}>Logout</li>
                  </ul>
                </button>
              ) : (
                <button className="btn-outline login-btn font-medium text-md flex items-center gap-2" onClick={() => handleShowLoginDialog()}>
                  <span className="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                    </svg>
                  </span>
                  Sign In
                </button>
              )
            }

          </li>
          <li className="nav-item resp-menu-btn">
            <button className="btn btn-ham" onClick={() => setShowSideMenu(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </button>
          </li>
        </ul>
        {
          showSideMenu ? authUser.user_info?.is_admin ? (
            <div className="resp-view">
              <SideNav 
                showSideMenu={showSideMenu}
                setShowSideMenu={setShowSideMenu}
                authUser={authUser}
                handleLogout={handleLogout} />
            </div>
          ) : (
            <ResponsiveNav
              authUser={authUser}
              pathName={pathName}
              handleLogout={handleLogout}
              handleShowLoginDialog={handleShowLoginDialog}
              showSideMenu={showSideMenu}
              setShowSideMenu={setShowSideMenu}
            />
          ) : null
        }

      </div>
    </nav>
  );
}
