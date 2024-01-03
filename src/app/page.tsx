import { AppProps } from "next/app";
import ProductList from "./(components)/product-list";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="hero-banner flex items-center">
        <div className="main-wrapper">
          <div className="intro-info max-w-[50%]">
            <p className="text-[22px]">Hello, Welcome to</p>
            <h2 className="text-[55px] brand-name">Sanu's Nursery</h2>
            <p className="text-[22px] pb-[20px]">We specilize in growing plants ranging from vegetables, fruits to flowers and everything in between. We sell greminated plants which is ready for you to plant directly.</p>
            <Link href="/products/">
              <button className="btn-primary">View Products</button>
            </Link>
          </div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-between py-[30px] main-wrapper">
        <h2 className="title text-[var(--card-color)] text-[28px] pb-[5px] underline">Our Products</h2>
        <ProductList product_count={4} />
        <Link href="/products">
          <button className="btn-primary">Show More</button>
        </Link>
      </main>
    </>
  );
}
