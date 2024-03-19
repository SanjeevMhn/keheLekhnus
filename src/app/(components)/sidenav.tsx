'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TAuthState } from "../lib/auth/authSlice";

type TMenuItem = {
    name: string,
    link: string,
    icon: any,
    items?: Array<TMenuItem>
}

type SideNavProps = {
    authUser?: TAuthState,
    showSideMenu?: boolean,
    setShowSideMenu?: Dispatch<SetStateAction<boolean>>,
    handleLogout?: () => void
}


const SideNav: FC<SideNavProps> = ({ authUser, showSideMenu, setShowSideMenu, handleLogout }) => {
    const [productActive, setProductActive] = useState<boolean>(true);
    const menuList: Array<TMenuItem> = [
        {
            name: 'dashboard',
            link: '/admin',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" /></svg>
        },
        {
            name: 'products',
            link: '',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z" /></svg>,
            items: [
                {
                    name: 'product list',
                    link: '/admin/products',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                },
                {
                    name: 'add products',
                    link: '/admin/products/entry',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                },
                {
                    name: 'categories',
                    link: '/admin/products/categories',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                },
            ]
        },
        {
            name: 'orders',
            link: '/admin/orders',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" /></svg>
        },
        {
            name: 'users',
            link: '/admin/users',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>
        },
        {
            name: 'messages',
            link: '/admin/messages',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
        },
    ]
    const pathName = usePathname();

    const handleSideMenu = () => {
        if (setShowSideMenu && setShowSideMenu !== undefined) {
            setShowSideMenu(false);
        }
    }

    return (
        <aside className="sidenav-container">
            <button className="btn-close" onClick={handleSideMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            </button>
            <div className="brand-link">
                <Link href="/admin" className="brand-name !text-[var(--base-color)]" onClick={handleSideMenu}>Sanu&apos;s Nursery</Link>
            </div>
            {
                authUser !== undefined ?
                    authUser.user_info !== null ? (
                        <div className="user-btn-container p-[10px]">
                            <button className="btn-outline w-full user-btn font-medium text-md flex items-center gap-2">
                                <span className="img-container bg-blue-400">
                                    {
                                        authUser.user_info.user_img ? (
                                            <img src={authUser.user_info.user_img} />
                                        ):null
                                    }
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
                                    {/* <li className="dropdown-item">Profile</li> */}
                                    <li className="dropdown-item">Settings</li>
                                    <li className="dropdown-item" onClick={handleLogout}>Logout</li>
                                </ul>
                            </button>
                        </div>) : null : null
            }
            <ul className="sidenav-menulist">
                {
                    menuList.map((menu: TMenuItem, index: number) => (
                        menu.items && menu.items?.length > 0 ? (
                            <li className="list-item" key={index}>
                                <span className={`list-link`} onClick={() => { setProductActive(!productActive) }}>
                                    <span className="icon-container">{menu.icon}</span>
                                    <span className="label-text">{menu.name}</span>
                                    <div className="icon-container ml-auto">
                                        {
                                            productActive ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                                            )
                                        }
                                    </div>
                                </span>
                                {
                                    productActive ? (
                                        <ul className="sub-menulist">
                                            {
                                                menu.items.map((subItem: TMenuItem, index: number) => (
                                                    <li className="list-item" key={index}>
                                                        <Link href={subItem.link} className={`list-link ${pathName === subItem.link ? 'active' : ''}`} onClick={handleSideMenu}>
                                                            <span className="icon-container">{subItem.icon}</span>
                                                            <span className="label-text">{subItem.name}</span>
                                                        </Link>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    ) : null
                                }
                            </li>
                        ) : (
                            <li className="list-item" key={index}>
                                <Link href={menu.link} className={`list-link ${pathName === menu.link ? 'active' : ''}`} onClick={handleSideMenu}>
                                    <span className="icon-container">{menu.icon}</span>
                                    <span className="label-text">{menu.name}</span>
                                </Link>
                            </li>
                        )
                    ))

                }

            </ul>

        </aside>
    )
}

export default SideNav;
