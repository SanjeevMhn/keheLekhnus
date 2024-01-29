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
import { useEffect, useRef } from "react";
import api from "../service/interceptor/interceptor";

export default function Header() {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const authUser: TAuthState = useSelector((state: any) => state.auth)
  const store = useStore();
  const router = useRouter();
  const handleShowSearchDialog = () => {
    dispatch(showDialog({ title: 'Search Products', component: SearchProducts }));
  };

  const handleShowLoginDialog = () => {
    dispatch(showDialog({ title: 'Login', component: LoginForm }));
  }

  const handleLogout = async () => {
    try {
      const logoutConfig: AxiosRequestConfig = {
        method: 'post',
        url: 'http://localhost:8080/api/v1/auth/logout',
        withCredentials: true,
        headers: {
          authorization: `Bearer ${authUser.user_token}`
        },
      }
      dispatch(showConfirm({
        message: 'Do you want to logout?',
        onConfirm: async () => {
          const logoutRes = await axios(logoutConfig);
          if (logoutRes.status == 200) {
            dispatch(logout());
            dispatch(showNotification({
              message: 'User Logged Out',
              type: 'success'
            }));
            router.push('');
            window.location.reload();
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
      const checkUserReq = await api.get('http://localhost:8080/api/v1/auth/me');
      const checkUserRes = checkUserReq.data;
      dispatch(setUserData({
        user_name: checkUserRes.user[0].user_name,
        user_email: checkUserRes.user[0].user_email,
        is_admin: checkUserRes.user[0].user_role == 'admin' ? true : false
      }))
      if (checkUserRes.user[0].user_role === 'admin') {
        router.push('/admin/');
        router.refresh();
      }
    }

  }

  return (
    <nav className="md: px-[40px] shadow-xl sticky top-0 bg-[var(--base-color)] z-40">
      <div className={`main-navigation ${!authUser.user_info?.is_admin ? 'main-wrapper' : ''}`}>
        <Link href="/" className={`brand-name ${authUser.user_info?.is_admin ? 'hidden' : ''}`}>
          Sanu's Nursery
        </Link>
        <ul className="nav-list">
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
              <li className="nav-item">
                <button type="button" className="notify-btn flex">
                  <span className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                  </span>
                  <span className="notify-num">0</span>
                </button>
              </li>
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

          <li className="nav-item ml-5">
            {
              authUser.user_info ? (
                <button className="btn-outline user-btn font-medium text-md flex items-center gap-2">
                  <span className="img-container bg-blue-400">
                  </span>
                  <span className="user-name">
                    {authUser.user_info.user_name}
                  </span>
                  <span className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </span>
                  <ul className="dropdown-list">
                    <li className="dropdown-item">Profile</li>
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
        </ul>
      </div>
    </nav>
  );
}
