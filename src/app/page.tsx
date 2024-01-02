import { AppProps } from 'next/app';
import ProductList from './(components)/product-list';
import BreadCrumb, { TBreadCrumb } from './(components)/breadcrumb';

export default async function Home () {
  const crumbs:Array<TBreadCrumb> = [
    {
      name: 'home',
      link: '/' 
    }
  ] 
  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <ProductList/>
      </main>
    </>
  )
}

