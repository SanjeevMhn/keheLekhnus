'use client'

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import api from "../service/interceptor/interceptor";
import { showNotification } from "../lib/notifications/notificationSlice";
import { resultDialog } from "../lib/dialog/dialogSlice";

const OrderItemDetail = () => {
  const dialog = useSelector((state: any) => state.dialog);
  const [quantity, setQuantity] = useState<number>(dialog.data.prod_quantity);
  const quantityRef = useRef<number>(dialog.data.prod_quantity)
  const dispatch = useDispatch<any>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (quantity !== quantityRef.current && quantity !== 0 && quantity > 0) {
      try {
        const response = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/orders/order_detail/${dialog.data.order_detail_id}`, {
          product_quantity: quantity
        });
        if (response.status == 200) {
          dispatch(showNotification({
            message: 'Order item updated',
            type: 'success'
          }))
          dispatch(resultDialog());
        }
      } catch (err: any) {
        console.error(err);
      }
    }
  }

  const handleUpdateQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    let input = Number(e.target.value);
    if (input !== null && input > 0) {
      setQuantity(input);
    }  
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="img-container mx-auto h-auto w-[90%] max-w-[200px] border border-[var(--card-color)] rounded-lg overflow-hidden flex items-center justify-center">
        <img src={dialog.data.prod_img} className="w-full h-full object-contain" />
      </div>
      <div className="detail-container py-[15px] text-center">
        <h2 className="text-2xl">{dialog.data.prod_name}</h2>
        <h4 className="text-xl">{dialog.data.prod_category}</h4>
        <h5 className="text-lg text-[var(--card-color)]">Rs.&nbsp;{dialog.data.prod_price}</h5>
      </div>
      <div className="product-quantity justify-center">
        <button type="button" className="btn minus" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <input type="text" name="prod-quantity" id="" value={quantity} className="text-center text-lg" onChange={handleUpdateQuantity} />
        <button type="button" className="btn plus" onClick={() => setQuantity(quantity + 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </button>
      </div>
      <div className="form-actions pt-[15px] text-center">
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
  )
}

export default OrderItemDetail
