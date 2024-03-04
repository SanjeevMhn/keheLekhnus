'use client'

import { Dispatch, FC, SetStateAction } from "react"
import { TAuthState } from "../lib/auth/authSlice"
import Link from "next/link"

type ResponsiveNavProps = {
    authUser: TAuthState,
    pathName: string,
    handleLogout: () => void,
    handleShowLoginDialog: () => void,
    showSideMenu: boolean,
    setShowSideMenu: Dispatch<SetStateAction<boolean>>
}

const ResponsiveNav: FC<ResponsiveNavProps> = ({ authUser, pathName, handleLogout, handleShowLoginDialog, showSideMenu, setShowSideMenu }) => {
    return (
        <div className="resp-nav-container">
            <div className="inner-container">

                <button className="btn-close" onClick={() => setShowSideMenu(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </button>
                <ul className="resp-nav-list">
                    <li className="nav-item mx-2 flex">
                        {
                            authUser.user_info !== null ? (
                                <button className="btn-outline user-btn font-medium text-md flex-grow flex items-center gap-2">
                                    <span className="img-container bg-blue-400">
                                    </span>
                                    <span className="user-name">
                                        {authUser.user_info.user_name}
                                    </span>
                                    <span className="icon-container ml-auto">
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
                    <li className="nav-item">
                        <Link
                            href="/"
                            className={`nav-link ${pathName === "/" ? "active" : ""}`}
                            onClick={() => setShowSideMenu(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/products/"
                            className={`nav-link ${pathName === "/products" ? "active" : ""}`}
                            onClick={() => setShowSideMenu(false)}
                        >
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/contact"
                            className={`nav-link ${pathName === "/contact" ? "active" : ""}`}
                            onClick={() => setShowSideMenu(false)}
                        >
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/about"
                            className={`nav-link ${pathName === "/about" ? "active" : ""}`}
                            onClick={() => setShowSideMenu(false)}
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ResponsiveNav;