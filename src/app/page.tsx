import { AppProps } from 'next/app';
import Image from 'next/image'
import { FC } from 'react';
import ProductCard from './_components/product-card';

export type Product = {
  prod_id: number,
  prod_name: string,
  prod_price: string,
  prod_img: string,
  prod_inStock: boolean,
  prod_category: string,
};


const Home:FC = async () => {
  const { products } = await getProducts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 p-md-11 p-lg-24">
      <ul className="product-list">
        {
          products.map((product:Product) => {
            return(
              <li className="list-item" key={product.prod_id}>
                <ProductCard product={product}/>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}

export default Home;

async function getProducts(){
  const response = await fetch('http://localhost:8080/api/v1/products');

  if(!response.ok){
    throw new Error('Failed to fetch data');
  }

  return response.json();
}
