import Link from 'next/link';
import { lobster } from '../layout';

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
					<li className="nav-item">
						<Link href="/cart" className="nav-link cart">
							<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
								<path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
							</svg>
							<span className="cart-items-num">0</span>
						</Link>
					</li>
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
