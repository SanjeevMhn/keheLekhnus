'use client'
import { FC, useState } from "react";
import { CartItem, decrementQuantity } from "../lib/cart/cartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQuantity } from "../lib/cart/cartSlice";
import { showNotification } from "../lib/notifications/notificationSlice";

const CartItemRow: FC<{ item: CartItem, index: number }> = ({ item, index }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0)

  const handleRemoveCartItem = (item: CartItem) => {
    dispatch(removeFromCart(item))
    dispatch(showNotification({id: Date.now(), message: 'Item removed from cart', type: 'success'}))
  }
  return (
    <>
      <td>{index + 1}</td>
      <td>
        <div className="product-detail">
          <span className="img-container">
            <img src={item.img} alt="product image" />
          </span>
          <Link href={`/product/${item.id}`} className="product-name">{item.name}</Link>
        </div>
      </td>
      <td>
        <Link href={`products/${item.category}`} className="product-category">{item.category}</Link>
      </td>
      <td>
        <div className="product-quantity">
          <button className="btn minus" onClick={() => dispatch(decrementQuantity(item))}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
          <input type="number" name="prod-quantity" id="" value={item.quantity} onChange={(e) => setQuantity(Number(e.target.value)) } className="text-center text-lg" />
          <button className="btn plus" onClick={() => dispatch(incrementQuantity(item))}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </div>

      </td>
      <td className="text-right">{item.price}</td>
      <td className="text-right">{item.total}</td>
      <td>
        <button className="remove-btn mx-auto flex" onClick={() => handleRemoveCartItem(item)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        </button>
      </td>
    </>
  )
}

export default CartItemRow;

