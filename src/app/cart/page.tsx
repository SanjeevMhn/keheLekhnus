'use client'
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link";
import { CartItem } from "../lib/cart/cartSlice";
import CartItemRow from "../(components)/cart-item";
export default function Page() {
  const cart = useSelector((state: any) => state.cart)

  const getCartTotal = (): number => {
    let sum = 0;
    cart.map((item: CartItem) => {
      sum += item.total;
    })

    return sum;
  }


  return <>
    <div className="cart-container flex justify-center">
      <table className="cart-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((item: CartItem, index: number) => {
              return (
                <tr key={item.id}>
                  <CartItemRow item={item} index={index} />
                </tr>
              )
            })
          }

        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Sub Total</td>
            <td className="text-right">{getCartTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </>
}
