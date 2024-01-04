'use client'
import { useDispatch } from "react-redux";
import { hideDialog, initialDialogState } from "../lib/dialog/dialogSlice";
import { FormEvent } from "react";

const LoginForm = () => {
    const dispatch = useDispatch();

    const handleCloseLogin = () => {
        dispatch(hideDialog(initialDialogState))
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        dispatch(hideDialog(initialDialogState))
    }

    return (
        <>
            <div className="third-party-login flex justify-center gap-2 pb-[20px] border-b-2 border-[var(--card-color)] w-full">
                <button className="btn-primary">Login with Google</button>
                <button className="btn-outline-md">Login with Facebook</button>
            </div>
            <form className="login-form form-layout no-shadow pt-[20px]" onSubmit={handleSubmit}>
                <div className="form-body">
                    <div className="form-row default">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row default">
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="reset" className="btn-outline-md" onClick={() => handleCloseLogin()}>Cancel</button>
                    <button type="submit" className="btn-primary">Login</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm;