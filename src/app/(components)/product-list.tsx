import { FC } from "react";
import ProductCard from "./product-card"

export type Product = {
    prod_id: number,
    prod_name: string,
    prod_price: string,
    prod_img: string,
    prod_inStock: boolean,
    prod_category: string,
};

type CategoryType = {
    category?: string
}

const ProductList: FC<CategoryType> = async ({ category }) => {
    let response;
    if (!category) {
        response = await fetch('http://localhost:8080/api/v1/products/', { cache: 'no-cache' });
    } else {
        response = await fetch(`http://localhost:8080/api/v1/products/category/${category}`, { cache: 'no-cache' })
    }
    const { products } = await response?.json();
    return (
        <ul className="product-list">
            {
                products.map((product: Product) => {
                    return (
                        <li className="list-item" key={product.prod_id}>
                            <ProductCard product={product} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ProductList;