
import Link from 'next/link';
import { lobster } from '../layout';
import CartMenuItem from './cart-menu-item';
import ReduxProvider from './redux-provider';

export default function Header() {
	return (
		<nav className="shadow-xl">
			<div className="main-wrapper main-navigation">
				<Link href="/" className={`${lobster.className} text-[28px] brand-name`}>Sanu's Nursery</Link>
				<ul className="nav-list">
					<li className="nav-item">
						<Link href="/" className="nav-link">Home</Link>
					</li>
					<li className="nav-item">
						<Link href="/products/" className="nav-link">Products</Link>
					</li>

					<li className="nav-item">
						<Link href="/about" className="nav-link">About</Link>
					</li>
				</ul>
				<ul className="nav-list gap-5">
					<ReduxProvider>
						<CartMenuItem />
					</ReduxProvider>
					<li className="nav-item">
						<button className="btn-outline login-btn font-medium text-md flex items-center gap-2">
							<span className="icon-container">
								<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
									<path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
								</svg>
							</span>
							Sign In
						</button>
					</li>
				</ul>
			</div>
		</nav>
	)
}
