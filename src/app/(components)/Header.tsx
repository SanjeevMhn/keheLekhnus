import Link from 'next/link';

export default function Header(){
	return (
		<nav className="main-navigation">
			<ul className="nav-list">
				<li className="nav-item">
					<Link href="/" className="nav-link">Home</Link>
				</li>
				<li className="nav-item">
					<Link href="/products/" className="nav-link">Products</Link>
				</li>
				<li className="nav-item">
					<Link href="/cart" className="nav-link">Cart</Link>
				</li>
				<li className="nav-item">
					<Link href="/about" className="nav-link">About</Link>
				</li>
			</ul>
		</nav>
	)
}
