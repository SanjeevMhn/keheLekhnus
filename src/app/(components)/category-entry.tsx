'use client'

import { useDispatch, useSelector } from "react-redux"
import { DialogState, hideDialog, resultDialog } from "../lib/dialog/dialogSlice";
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import api from "../service/interceptor/interceptor";
import { useRouter, useSearchParams } from "next/navigation";
import { showNotification } from "../lib/notifications/notificationSlice";
import { revalidatePath } from "next/cache";

const CategoryEntry: FC<{ catId?: number }> = ({ catId }) => {
    const dispatch = useDispatch();
    const data: DialogState = useSelector((state: any) => state.dialog);
    const categoryFetched = useRef<boolean>(false);
    const [categoryData, setCategoryData] = useState<{ prod_cat_id: number, prod_cat_name: string } | null>(null)
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [categoryNameErr, setCategoryNameErr] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleCloseDialog = () => {
        dispatch(hideDialog());
    }

    const router = useRouter();
    const searchParams = useSearchParams();
    // const [catId,setCatId] = useState<number | null>(null);

    const getCategory = async (catId: number) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/categories/id/${catId}`);
            const data = await response.data;
            setCategoryData({ ...data.category });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {

        if (!categoryFetched.current) {
            if (data.data && Object.keys(data.data).length !== 0) {
                setEditMode(true);
                getCategory(data.data.cat_id);
            }

        }
        return () => {
            categoryFetched.current = true;
        }
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (editMode) {
                const editResponse = await api.patch(`http://localhost:8080/api/v1/categories/id/${categoryData?.prod_cat_id}`, { category_name: categoryName });
                const data = await editResponse.data
                if (editResponse.status == 201) {
                    dispatch(showNotification({ message: 'Category Updated Successfully', type: 'success' }))
                    dispatch(resultDialog())
                    // dispatch(hideDialog());
                    router.refresh();
                }
                return;
            }
            const response = await api.post('http://localhost:8080/api/v1/categories', { category_name: categoryName })
            const data = await response.data;
            if (response.status == 201) {
                dispatch(showNotification({ message: 'Category Added Successfully', type: 'success' }))
                dispatch(resultDialog())
                // dispatch(hideDialog());
                router.refresh();
            }

        } catch (e) {
            console.error(e)
        }

    }

    const handleCategoryName = (e: ChangeEvent<HTMLInputElement>) => {
        let catName = e.target.value;
        if (catName === '' || catName === null) {
            setCategoryNameErr('Please Category Name');
        } else {
            setCategoryName(catName);
            setCategoryNameErr(null);
        }
    }

    return (
        <form className="category-entry form-layout no-shadow" onSubmit={handleSubmit}>
            <div className="form-body">
                <div className="form-row default">
                    <div className="form-group">
                        <label htmlFor="cat_name" className="form-label">Category Name</label>
                        <input type="text" name="cat_name" id="cat_name" className={`form-control ${categoryNameErr !== null ? 'border-red-500' : ''}`} defaultValue={categoryData?.prod_cat_name} placeholder="Category Name" onChange={(e) => handleCategoryName(e)} autoFocus />
                        {categoryNameErr !== null ? (
                            <span className="text-red-600">{categoryNameErr}</span>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="form-actions">
                <button type="reset" className="btn-outline-md" onClick={handleCloseDialog}>Cancel</button>
                <button type="submit" className="btn-primary">
                    {editMode ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    )
}

export default CategoryEntry;