"use client";
import Link from "next/link";
import { lobster } from "../layout";
import CartMenuItem from "./cart-menu-item";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { showDialog } from "../lib/dialog/dialogSlice";
import SearchProducts from "./search-products";

export default function Header() {
  const pathName = usePathname();
  const dispatch = useDispatch();

  const handleShowSearchDialog = () => {
    dispatch(showDialog({ show: true, title: 'Search Products', component: SearchProducts}));
  };

  return (
    <nav className="md: px-[20px] shadow-xl">
      <div className="main-wrapper main-navigation">
        <Link href="/" className={`text-[28px] brand-name`}>
          Sanu's Nursery
        </Link>
        <ul className="nav-list">
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
              href="/about"
              className={`nav-link ${pathName === "/about" ? "active" : ""}`}
            >
              About
            </Link>
          </li>
        </ul>
        <ul className="nav-list">
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
          <li className="nav-item ml-5">
            <Link href="/login">
              <button className="btn-outline login-btn font-medium text-md flex items-center gap-2">
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
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
