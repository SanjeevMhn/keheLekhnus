'use client';

import { FC, useState } from "react"
import { Product } from "./product-list"
import { useSelector, useDispatch } from "react-redux";
import { addToCart, checkDuplicate } from "../lib/cart/cartSlice";
import { showNotification } from "../lib/notifications/notificationSlice";
import Link from "next/link";
import { TAuthState } from "../lib/auth/authSlice";

const ProductDetailCard: FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const auth:TAuthState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    let cartObj = {
      id: product.prod_id,
      name: product.prod_name,
      category: product.prod_category,
      price: product.prod_price,
      img: product.prod_img,
      quantity: quantity,
      total: Number(product.prod_price) * quantity
    }
    dispatch(addToCart(cartObj))
    if(auth.is_authenticated){
      
    }else{
      let cartSession = sessionStorage.getItem('cart');
      if(cartSession !== null){
        let cart:Array<any> = JSON.parse(cartSession);
        if(!checkDuplicate(cart,cartObj)){
          cart.push(cartObj);
          sessionStorage.setItem('cart',JSON.stringify(cart));  
        } 
       
      }else{
        let cartData:Array<any> = [];
        cartData.push(cartObj); 
        sessionStorage.setItem('cart',JSON.stringify(cartData)); 
      }
    }

    dispatch(showNotification({ message: "Item Added To Cart", type: "success" }))
  }

  const handleBuyNow = (product: Product) => {
    let cartObj = {
      id: product.prod_id,
      name: product.prod_name,
      category: product.prod_category,
      price: product.prod_price,
      img: product.prod_img,
      quantity: quantity,
      total: Number(product.prod_price) * quantity
    }
    dispatch(addToCart(cartObj))
  }


  return (
    <div className={`product-detail-container ${!product.prod_inStock ? 'out-of-stock' : ''}`}>
      <div className="inner-container">
        <span className="out-of-stock-banner">
          <span className="info-text">
            Out of Stock
          </span>
        </span>
        <div className="img-container">
          <img src={product.prod_img} alt="" />
        </div>
        <div className="product-detail">
          <h2 className="product-name text-[28px] lg:text-[35px]">
            {product.prod_name}
          </h2>
          <p className="product-price text-[22px] lg:text-[28px]">
            Rs.&nbsp;{product.prod_price}
          </p>
        </div>
        <div className="product-quantity">
          <button className="btn minus" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}> <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </svg>
          </button>
          <input type="number" name="prod-quantity" id="" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="text-center text-lg" />
          <button className="btn plus" onClick={() => setQuantity(quantity + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </div>
        <div className="product-action">
          <button className="btn" onClick={() => handleAddToCart(product)} disabled={!product.prod_inStock}>Add to Cart</button>
          <Link href="/cart">
            <button className="btn" disabled={!product.prod_inStock} onClick={() => handleBuyNow(product)}>Buy Now</button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ProductDetailCard;
