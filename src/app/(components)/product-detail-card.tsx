'use client';

import { FC, useState } from "react"
import { Product } from "./product-list"

const ProductDetailCard: FC<{ product: Product }> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="product-detail-container shadow-xl">
            <div className="img-container">
                <img src={product.prod_img} alt="" srcset="" />
            </div>
            <div className="product-detail">
                <h2 className="product-name text-[35px]">
                    {product.prod_name}
                </h2>
                <p className="product-price text-[28px]">
                    Rs.&nbsp;{product.prod_price}
                </p>
            </div>
            <div className="product-quantity">
                <button className="btn minus" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}> <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                </svg>
                </button>
                <input type="number" name="prod-quantity" id="" value={quantity} className="text-center text-lg" />
                <button className="btn plus" onClick={() => setQuantity(quantity + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                </button>
            </div>
            <div className="product-action">
                <button className="btn">Add to Cart</button>
                <button className="btn">Buy Now</button>
            </div>
        </div>
    )
}

export default ProductDetailCard;