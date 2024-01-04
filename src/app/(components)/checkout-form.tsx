'use client'
import { useDispatch } from "react-redux";
import { showDialog, hideDialog, initialDialogState } from "../lib/dialog/dialogSlice";
import LoginForm from './login-form';

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const handleDialogClose = () => {
        dispatch(hideDialog(initialDialogState))
    }

    const handleOpenLogin = () => {
        handleDialogClose();
        dispatch(showDialog({show: true, title: 'Login', component: LoginForm}));
    }

    return (
        <>
            <div className="third-party-login flex justify-center gap-2 pb-[20px] border-b-2 border-[var(--card-color)] w-full">
                <button className="btn-primary" onClick={() => { handleOpenLogin() }}>Login</button>
                <button className="btn-outline-md">Signup</button>
            </div>
            <form className="checkout-form form-layout no-shadow">
                <div className="form-body">
                    <div className="form-row default">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row default">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" id="email" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row default">
                        <div className="form-group">
                            <label htmlFor="contact" className="form-label">Contact</label>
                            <input type="tel" id="contact" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row default">
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" id="address" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn-outline-md" onClick={ () => handleDialogClose()}>Cancel</button>
                    <button className="btn-primary">Checkout</button>
                </div>
            </form>
        </>
    )
}

export default CheckoutForm;