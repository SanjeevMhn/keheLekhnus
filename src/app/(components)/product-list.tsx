import { FC } from "react";
import ProductCard from "./product-card";

export type Product = {
  prod_id: number;
  prod_name: string;
  prod_price: string;
  prod_img: string;
  prod_inStock: boolean;
  prod_category: string;
};

type ProductListPropType = {
  category?: string;
  product_count?: number;
};

const ProductList: FC<ProductListPropType> = async ({ category, product_count }) => {
  let response;
  if (!category) {
    if (product_count) {
      response = await fetch(
        `http://localhost:8080/api/v1/products?pageSize=${product_count}`,
        {
          cache: "no-cache",
        },
      );
    } else {
      response = await fetch("http://localhost:8080/api/v1/products/", {
        cache: "no-cache",
      });
    }
  } else {
    response = await fetch(
      `http://localhost:8080/api/v1/products/category/${category}`,
      { cache: "no-cache" },
    );
  }
  const { products } = await response?.json();
  return (
    <ul className="product-list py-[15px]">
      {products.map((product: Product) => {
        return (
          <li className="list-item" key={product.prod_id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductList;
