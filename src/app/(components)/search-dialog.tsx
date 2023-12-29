'use client';
import { useSelector, useDispatch } from "react-redux";
import { hideSearhDialog } from "../lib/search-dialog/searchDialogSlice";
import { useEffect, useState } from 'react';
import axios from "axios";

const SearchDialog = () => {
    const state: { show: boolean } = useSelector((state: any) => state.searchDialog);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleHideDialog = () => {
        dispatch(hideSearhDialog({ show: false }));
    }

    const getData = async () => {
        try {
            let response = await axios(`http://localhost:8080/api/v1/products/name?prod_name=banana`);
            console.log(response);
        } catch (e) {
            console.error(e)
        }
        
    }

    useEffect(() => {
        getData()
    }, [searchTerm])

    return (
        state.show ? (
            <div className="confirmation-overlay">
                <div className="search-dialog confirmation-box">
                    <div className="confirm-header">
                        <button className="close-btn" onClick={() => handleHideDialog()}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </button>
                    </div>
                    <div className="confirm-body">
                        <div className="input-group">
                            <input type="text" name="" id="" placeholder="Plant Name..." onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </button>
                        </div>
                        <div className="search-content">

                        </div>
                    </div>
                </div>
            </div>
        ) : (null)
        
    )
}

export default SearchDialog;