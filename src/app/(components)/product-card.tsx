import { FC } from "react"
import { Product } from "./product-list"
import Image from "next/image";
import Link from "next/link";

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/product/${product.prod_id}`}>
      <div className="product-card">
        <div className="img-container">
          <img src={`${product.prod_img}`} alt={""} />
        </div>
        <div className="product-details">
          <h3 className="product-name text-lg text-white">{product.prod_name}</h3>
          <p className="product-price text-base text-white">Rs.&nbsp;{product.prod_price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard;