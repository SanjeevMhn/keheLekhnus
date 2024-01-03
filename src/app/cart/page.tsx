'use client'
import { useSelector, useDispatch } from "react-redux"
import { CartItem } from "../lib/cart/cartSlice";
import CartItemRow from "../(components)/cart-item";
import Link from "next/link";
import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb";
import { showDialog } from "../lib/dialog/dialogSlice";
import CheckoutForm from "../(components)/checkout-form";
export default function Page() {
  const cart = useSelector((state: any) => state.cart)
  const dispatch = useDispatch();
  const getCartTotal = (): number => {
    let sum = 0;
    cart.map((item: CartItem) => {
      sum += item.total;
    })

    return sum;
  }

  const crumbs: Array<TBreadCrumb> = [
    {
      name: 'home',
      link: '/'
    },
    {
      name: 'cart',
      link: '/cart'
    },
    {
      name: 'checkout',
      link: '/cart'
    }
  ]

  const handleCheckout = () => {
    dispatch(showDialog({show: true, title: 'Checkout Form', component: CheckoutForm}));
  }


  return (
    <div className="pb-[40px]">
      <BreadCrumb crumbs={crumbs} />
      {
        cart.length > 0 ? (
          <div className="cart-container flex flex-col items-center gap-[45px]">
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
            <div className="checkout-cart" onClick={() => handleCheckout()}>
              <button className="btn-primary">Checkout</button>
            </div>
          </div>) : (
          <div className="empty-cart-container">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </div>
            <h2 className="info-text">Your cart is empty</h2>
            <Link href={`/products/`} className="btn go-to-shopping">
              continue shopping
            </Link>
          </div>
        )
      }
    </div>
  )
}
