import ProductCard from "./product-card"

export type Product = {
  prod_id: number,
  prod_name: string,
  prod_price: string,
  prod_img: string,
  prod_inStock: boolean,
  prod_category: string,
};

const ProductList = async () => {
  const response = await fetch('http://localhost:8080/api/v1/products/', { cache: 'no-cache' })
  const { products } = await response.json();
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