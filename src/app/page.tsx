import { AppProps } from 'next/app';
import ProductList from './(components)/product-list';

export default async function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 p-md-11 p-lg-24">
      <ProductList/>
    </main>
  )
}

