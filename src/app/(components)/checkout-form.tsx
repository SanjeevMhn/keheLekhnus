'use client'
import { useDispatch, useSelector } from "react-redux";
import { showDialog, hideDialog, initialDialogState } from "../lib/dialog/dialogSlice";
import LoginForm from './login-form';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import api from "../service/interceptor/interceptor";
import { v4 as uuidv4 } from 'uuid';
import { CartItem, clearCart, getCartApi } from "../lib/cart/cartSlice";
import { showNotification } from "../lib/notifications/notificationSlice";
import { showPDFViewer } from "../lib/pdfView/pdfViewSlice";
import { TAuthState } from "../lib/auth/authSlice";

type PaymentType = 'cash' | 'esewa' | 'khalti' | 'default';

type CheckoutFormType = {
  user_name: string | null,
  user_email: string | null,
  user_contact: number | null,
  user_address: string | null,
  payment_type: PaymentType
}

type CheckoutFormErrType = {
  user_name: string | null,
  user_email: string | null,
  user_contact: string | null,
  user_address: string | null,
  payment_type: string | null
}

const CheckoutForm = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch<any>();
  const cart = useSelector((state: any) => state.cart);
  const pdfView = useSelector((state: any) => state.pdfViewer)
  const [paymentType, setPaymentType] = useState<any>([]);
  const paymentTypesFetched = useRef<boolean>(false);
  const authUser: TAuthState = useSelector((state: any) => state.auth);
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormType>({
    user_name: null,
    user_email: null,
    user_contact: null,
    user_address: null,
    payment_type: 'default'
  });
  const [checkoutFormErr, setCheckoutFormErr] = useState<CheckoutFormErrType>({
    user_name: null,
    user_email: null,
    user_contact: null,
    user_address: null,
    payment_type: null
  });

  useEffect(() => {
    if (!paymentTypesFetched.current) {
      getPaymentTypes();
    }

    return () => {
      paymentTypesFetched.current = true;
    }
  }, [])

  useEffect(() => {
    if (authUser.is_authenticated) {
      setCheckoutFormData({
        user_name: authUser.user_info?.user_name ? authUser.user_info?.user_name : null,
        user_email: authUser.user_info?.user_email ? authUser.user_info?.user_email : null,
        user_contact: authUser.user_info?.user_contact ? Number(authUser.user_info?.user_contact) : null,
        user_address: authUser.user_info?.user_address ? authUser.user_info?.user_address : null,
        payment_type: 'default'
      })
    }
  }, [authUser])

  const getPaymentTypes = async () => {
    try {
      const response = await api.get(`${baseUrl}/orders/paymentTypes`);
      const data = await response.data;
      setPaymentType(data.paymentTypes);
    } catch (e) {
      console.error(e)
    }
  }

  const handleDialogClose = () => {
    dispatch(hideDialog())
  }

  const handleOpenLogin = () => {
    handleDialogClose();
    dispatch(showDialog({ title: 'Login', component: LoginForm }));
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.value;

    setCheckoutFormErr({
      ...checkoutFormErr,
      user_name: null
    })

    if (name !== null && name !== '') {
      if (name.length >= 8) {
        setCheckoutFormData({
          ...checkoutFormData,
          user_name: name
        })
      } else {
        setCheckoutFormErr({
          ...checkoutFormErr,
          user_name: 'User name cannot be less than 5 characters'
        })
      }

    } else {
      setCheckoutFormErr({
        ...checkoutFormErr,
        user_name: 'User name is required'
      })

    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    let email: string = e.target.value;
    // let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setCheckoutFormErr({
      ...checkoutFormErr,
      user_email: null
    })

    if (email !== null && email !== '') {
      if (email.match(emailPattern)) {
        setCheckoutFormData({
          ...checkoutFormData,
          user_email: email
        })
      } else {
        setCheckoutFormErr({
          ...checkoutFormErr,
          user_email: 'Please enter valid email'
        })
      }
    } else {
      setCheckoutFormErr({
        ...checkoutFormErr,
        user_email: 'User email is required'
      })
    }
  }

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    let contact: string = e.target.value;

    setCheckoutFormErr({
      ...checkoutFormErr,
      user_contact: null
    })

    if (contact !== null && contact !== '') {
      if (contact.length == 10) {
        let numContact = Number(contact);
        setCheckoutFormData({
          ...checkoutFormData,
          user_contact: numContact
        })
      } else {
        setCheckoutFormErr({
          ...checkoutFormErr,
          user_contact: 'Contact number must be atleast 10 digits'
        })
      }
    } else {
      setCheckoutFormErr({
        ...checkoutFormErr,
        user_contact: 'Contact number is required'
      })
    }
  }

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    let address: string = e.target.value;

    setCheckoutFormErr({
      ...checkoutFormErr,
      user_address: null
    })

    if (address !== null && address !== '') {
      setCheckoutFormData({
        ...checkoutFormData,
        user_address: address
      })
    } else {
      setCheckoutFormErr({
        ...checkoutFormErr,
        user_address: 'Address is required'
      })
    }
  }

  const handlePaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let payment: PaymentType = e.target.value as PaymentType;

    setCheckoutFormErr({
      ...checkoutFormErr,
      payment_type: null
    })

    if (payment !== 'default') {
      setCheckoutFormData({
        ...checkoutFormData,
        payment_type: payment
      })
    } else {
      setCheckoutFormErr({
        ...checkoutFormErr,
        payment_type: 'Please select payment type'
      })
    }
  }

  const handleCheckoutFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let errCount = 0;
    Object.keys(checkoutFormData).map((value: any, index: number) => {
      if (checkoutFormData[value] === null || checkoutFormData[value] === 'default') {
        errCount += 1;
        setCheckoutFormErr((prev) => ({
          ...prev,
          [value]: 'Required'
        }))
      }
    });


    let date = new Date();
    let orderDate = `${date.getFullYear()}-${(1 + date.getMonth()).toString()}-${date.getDate().toString().padStart(2, '0')}`;
    let orderTotal = cart.reduce((acc: number, data: CartItem) => {
      return acc + (Number(data.price) * data.quantity);
    }, 0)


    if (errCount == 0) {
      if (authUser.is_authenticated) {

        let orderReceipt = {
          order_number: uuidv4(),
          user_id: authUser.user_info?.user_id,
          order_date: orderDate,
          order_total: orderTotal,
          delivery_address: checkoutFormData.user_address,
          user_name: checkoutFormData.user_name,
          user_email: checkoutFormData.user_email,
          user_contact: checkoutFormData.user_contact,
          payment_type: checkoutFormData.payment_type,
          order_products: cart
        }

        const response = await api.post(`${baseUrl}/orders`, orderReceipt);
        if (response.status == 201) {
          dispatch(hideDialog());
          const clearCart = await api.post(`${baseUrl}/cart/clear/${authUser.user_info?.user_id}`);
          if (clearCart.status == 200) {
            dispatch(getCartApi(authUser.user_info?.user_id));
          }
          dispatch(showNotification({
            message: 'Your order has been placed!!',
            type: 'success'
          }))
          dispatch(showPDFViewer({
            order_date: orderDate,
            order_products: cart,
            order_total: orderTotal,
            user_name: checkoutFormData.user_name,
            user_email: checkoutFormData.user_email,
            user_contact: String(checkoutFormData.user_contact),
            user_address: checkoutFormData.user_address
          }))
        } else {

          let orderReceipt = {
            order_number: uuidv4(),
            user_id: null,
            order_date: orderDate,
            order_total: orderTotal,
            delivery_address: checkoutFormData.user_address,
            user_name: checkoutFormData.user_name,
            user_email: checkoutFormData.user_email,
            user_contact: checkoutFormData.user_contact,
            payment_type: checkoutFormData.payment_type,
            order_products: cart
          }

          const response = await api.post(`${baseUrl}/orders`, orderReceipt);
          if (response.status == 201) {
            dispatch(hideDialog());
            dispatch(clearCart());
            dispatch(showNotification({
              message: 'Your order has been placed!!',
              type: 'success'
            }))
            dispatch(showPDFViewer({
              order_date: orderDate,
              order_products: cart,
              order_total: orderTotal,
              user_name: checkoutFormData.user_name,
              user_email: checkoutFormData.user_email,
              user_contact: String(checkoutFormData.user_contact),
              user_address: checkoutFormData.user_address
            }))
          }
        }
      }

    }
  }

  return (
    <>
      {
        !authUser.is_authenticated ? (
          <div className="third-party-login flex justify-center gap-2 pb-[20px] mb-[10px] w-full flex-wrap border-b-2 border-[var(--card-color)]">
            <button className="btn-primary" onClick={() => { handleOpenLogin() }}>Login</button>
            <button className="btn-outline-md">Signup</button>
          </div>
        ) : null
      }
      <form className="checkout-form form-layout floating-label no-shadow" onSubmit={handleCheckoutFormSubmit}>
        <div className="form-body">
          <div className="form-row default">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className={`form-control ${checkoutFormErr.user_name !== null ? 'border-red-500' : ''}`}
                onChange={(e) => handleNameChange(e)}
                onBlur={handleNameChange}
                autoFocus
                placeholder="Name"
                defaultValue={authUser.is_authenticated ? authUser.user_info?.user_name! : ''} />
              {
                checkoutFormErr.user_name !== null ? (
                  <div className="err-msg">
                    {checkoutFormErr.user_name}
                  </div>
                ) : null
              }

            </div>
          </div>
          <div className="form-row default">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                id="email"
                className={`form-control ${checkoutFormErr.user_email !== null ? 'border-red-500' : ''}`}
                onChange={(e) => handleEmailChange(e)}
                onBlur={handleEmailChange}
                placeholder="Email"
                defaultValue={authUser.is_authenticated ? authUser.user_info?.user_email! : ''} />
              {
                checkoutFormErr.user_email !== null ? (
                  <div className="err-msg">
                    {checkoutFormErr.user_email}
                  </div>
                ) : null
              }
            </div>
          </div>
          <div className="form-row default">
            <div className="form-group">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input
                type="tel"
                id="contact"
                className={`form-control ${checkoutFormErr.user_contact !== null ? 'border-red-500' : ''}`}
                onChange={(e) => handleContactChange(e)}
                onBlur={handleContactChange}
                placeholder="Contact"
                defaultValue={authUser.is_authenticated ? authUser.user_info?.user_contact! : ''} />
              {
                checkoutFormErr.user_contact !== null ? (
                  <div className="err-msg">
                    {checkoutFormErr.user_contact}
                  </div>
                ) : null
              }
            </div>
          </div>
          <div className="form-row default">
            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                className={`form-control ${checkoutFormErr.user_address !== null ? 'border-red-500' : ''}`}
                onChange={(e) => handleAddressChange(e)}
                onBlur={handleAddressChange}
                placeholder="Address"
                defaultValue={authUser.is_authenticated ? authUser.user_info?.user_address! : ''} />
              {
                checkoutFormErr.user_address !== null ? (
                  <div className="err-msg">
                    {checkoutFormErr.user_address}
                  </div>
                ) : null
              }
            </div>
          </div>
          <div className="form-row two-col">
            <div className="form-group">
              {/*<label htmlFor="payment_type" className="form-label">Payment Type</label>*/}
              <select name="payment_type" id="payment_type" className={`form-control ${checkoutFormErr.payment_type !== null ? 'border-red-500' : ''}`} onChange={(e) => handlePaymentChange(e)} onBlur={handlePaymentChange}>
                <option value="default">--Choose Payment Type</option>
                {
                  paymentType.map((payment: any, index: number) => (
                    <option value={payment.payment_id} key={index} className="capitalized">{payment.payment_type}</option>
                  ))
                }
              </select>
              {
                checkoutFormErr.payment_type !== null ? (
                  <div className="err-msg">
                    {checkoutFormErr.payment_type}
                  </div>
                ) : null
              }
            </div>
          </div>
        </div>
        <div className="form-actions flex-wrap">
          <button className="btn-outline-md" onClick={() => handleDialogClose()} type="button">Cancel</button>
          <button className="btn-primary" type="submit">Checkout</button>
        </div>
      </form>
    </>
  )
}

export default CheckoutForm;
