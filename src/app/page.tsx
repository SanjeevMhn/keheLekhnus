import { AppProps } from "next/app";
import ProductList from "./(components)/product-list";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between pb-[20px]">
      <ProductList product_count={4} />
      <Link href="/products">
        <button className="btn-primary">Show More</button>
      </Link>
    </main>
  );
}
