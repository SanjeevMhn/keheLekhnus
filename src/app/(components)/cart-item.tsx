'use client'
import { FC, useEffect, useState } from "react";
import { CartParams, CartItem, CartState, decrementQuantity, removeCartItemApi, getCartApi } from "../lib/cart/cartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQuantity } from "../lib/cart/cartSlice";
import { showNotification } from "../lib/notifications/notificationSlice";
import { showConfirm } from "../lib/confirmation/confirmationSlice";
import { TAuthState } from "../lib/auth/authSlice";
import api from "../service/interceptor/interceptor";

const CartItemRow: FC<{ item: CartItem, index: number }> = ({ item, index }) => {
  const dispatch = useDispatch<any>();
  const [quantity, setQuantity] = useState(0)
  const authUser: TAuthState = useSelector((state: any) => state.auth);
  const cartState: CartState = useSelector((state: any) => state.cart);

  const handleRemoveCartItem = (item: CartItem) => {
    if (authUser.is_authenticated) {
      dispatch(showConfirm({
        message: 'Remove item from cart?',
        onConfirm: () => {

          if (authUser.is_authenticated) {
            const params: CartParams = {
              user_id: authUser.user_info?.user_id,
              cart_item: item
            }
            dispatch(removeCartItemApi(params));
            dispatch(showNotification({ message: 'Item removed from cart', type: 'success' }))
          } else {
            let cartSession = JSON.parse(sessionStorage.getItem('cart')!);
            dispatch(removeFromCart(item))
            dispatch(showNotification({ message: 'Item removed from cart', type: 'success' }))
            const updatedCart = cartSession.filter((cartItem: CartItem) => {
              return cartItem.id !== item.id
            })
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
          }

        }
      }))
    }
  }

  const handleQuantityChange = async(item: CartItem, action: string) => {
    if (action === 'decrease') {
      if(authUser.is_authenticated){
        const itemToUpdate = cartState.find((cartItem: CartItem) => cartItem.id === item.id );
               
        if (itemToUpdate && itemToUpdate.quantity > 1) {
          let objCopy = { ...itemToUpdate };
          objCopy.quantity -= 1;
          const update = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart`,{
            user_id: authUser.user_info?.user_id,
            cart_item: objCopy 
          });
        
          if(update.status == 200){
            dispatch(getCartApi(authUser.user_info?.user_id));  
          } 
        }
       
      }else{
        dispatch(decrementQuantity(item));
        let cartSession = JSON.parse(sessionStorage.getItem('cart')!);
        const itemToUpdate: CartItem = cartSession.find((cartItem: CartItem) => cartItem.id == item.id);
        if (itemToUpdate && itemToUpdate.quantity > 1) {
          itemToUpdate.quantity -= 1;
        }
        let updatedCart: Array<CartItem> = [];
        updatedCart.push(itemToUpdate);
        cartSession.map((cartItem: CartItem) => {
          if (cartItem.id !== itemToUpdate.id) {
            updatedCart.push(cartItem);
          }
        })
        sessionStorage.setItem('cart', JSON.stringify(updatedCart)); 
      }
      
    }

    if (action === 'increase') {
      if(authUser.is_authenticated){
        const itemToUpdate = cartState.find((cartItem: CartItem) => cartItem.id === item.id );
        if (itemToUpdate) {
          let objCopy = { ...itemToUpdate };
          objCopy.quantity += 1;
          const update = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart`,{
            user_id: authUser.user_info?.user_id,
            cart_item: objCopy 
          });
        
          if(update.status == 200){
            dispatch(getCartApi(authUser.user_info?.user_id));  
          } 
        }      
      }else{
        dispatch(incrementQuantity(item));
        let cartSession = JSON.parse(sessionStorage.getItem('cart')!);
        const itemToUpdate: CartItem = cartSession.find((cartItem: CartItem) => cartItem.id == item.id);
        if (itemToUpdate) {
          itemToUpdate.quantity += 1;
        }
        let updatedCart: Array<CartItem> = [];
        updatedCart.push(itemToUpdate);
        cartSession.map((cartItem: CartItem) => {
          if (cartItem.id !== itemToUpdate.id) {
            updatedCart.push(cartItem);
          }
        })
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    }

  }

  return (
    <>
      <td data-col="index">{index + 1}</td>
      <td>
        <Link href={`/product/${item.id}`} className="product-detail">
          <span className="img-container">
            <img src={item.img} alt="product image" />
          </span>
          <div className="product-name">{item.name}</div>
        </Link>
      </td>
      <td data-col="category">
        <Link href={`products/${item.category}`} className="product-category">{item.category}</Link>
      </td>
      <td>
        <div className="product-quantity">
          <button className="btn minus" onClick={() => handleQuantityChange(item, 'decrease')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
          <input type="number" name="prod-quantity" id="" value={item.quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="text-center text-lg" />
          <button className="btn plus" onClick={() => handleQuantityChange(item, 'increase')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </div>

      </td>
      <td className="text-right" data-col="price">Rs.&nbsp;{item.price}</td>
      <td className="text-right" data-col="total">Rs.&nbsp;{Number(item.price) * item.quantity}</td>
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

