'use client';
import { useSelector, useDispatch } from "react-redux";
import { DialogComponentType, DialogState, hideDialog, initialDialogState } from "../lib/dialog/dialogSlice";


const Dialog = () => {
    const state: DialogState = useSelector((state:any) => state.dialog);
    const dispatch = useDispatch();


    const handleHideDialog = () => {
        dispatch(hideDialog());
    }

    const DynamicComponent: DialogComponentType  = state?.component;



    return (
        state?.show ? (
            <div className="confirmation-overlay">
                <div className="dialog confirmation-box">
                    <div className="confirm-header">
                        <h2 className="title">{state.title}</h2>
                        <button className="close-btn" onClick={() => handleHideDialog()}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </button>
                    </div>
                    <div className="confirm-body">
                        <DynamicComponent />
                    </div>
                </div>
            </div>
        ) : (null)

    )
}

export default Dialog;