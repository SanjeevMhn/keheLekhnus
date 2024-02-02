'use client'
import { useDispatch, useSelector } from "react-redux"
import { showConfirm, hideConfirm, ConfirmationType } from "../lib/confirmation/confirmationSlice"
import { useEffect } from "react";

const ConfrimationContainer = () => {
    const confirm: ConfirmationType = useSelector((state: any) => state.confirmation);
    const dispatch = useDispatch();

    const handleConfirm = () => {
        if (confirm.onConfirm) {
            confirm.onConfirm();
        }
        dispatch(hideConfirm())
    }

    const handleCancel = () => {
        dispatch(hideConfirm())
    }

    useEffect(() => {
        if(confirm?.show){
            window.addEventListener('keydown',(e:KeyboardEvent) => {
                if(e.key === 'Escape'){
                    handleCancel();
                }
            })
        }
    },[confirm]) 

    return (
        confirm.show ? (
            <div className="confirmation-overlay">
                <div className="confirmation-box">
                    <div className="confirm-header">
                        <button className="close-btn" onClick={() => handleCancel()}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </button>
                    </div>
                    <div className="confirm-body">
                        <p className="message">{confirm.message}</p>
                    </div>
                    <div className="actions">
                        <button className="btn confirm" onClick={() => handleConfirm()}>
                            Ok
                        </button>
                        <button className="btn cancel" onClick={() => handleCancel()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        ) : null
    )
}

export default ConfrimationContainer;