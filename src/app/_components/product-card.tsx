import { FC } from "react"
import { Product } from "../page"

const ProductCard:FC<Product> = (product) => {
	return (
		<div className="product-card">
          <div className="img-container">
            <img src={product.prod_img}/>
          </div>
          <div className="product-details">
            <h3 className="product-name">{product.prod_name}</h3>
            <p className="product-price">{product.prod_price}</p>
          </div>
        </div>
	)
}

export default ProductCard;