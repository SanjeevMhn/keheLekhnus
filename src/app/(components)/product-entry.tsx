"use client"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import BreadCrumb, { TBreadCrumb } from "./breadcrumb";
import api from "../service/interceptor/interceptor";
import { useDispatch } from "react-redux";
import { showNotification } from "../lib/notifications/notificationSlice";
import { hideConfirm } from "../lib/confirmation/confirmationSlice";
import { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

const ProductEntry: FC<{ productId: number, prod_categories: Array<{ 'prod_cat_id': number, 'prod_cat_name': string }> }> = ({ productId, prod_categories }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [productImg, setProductImg] = useState<string | null>(null);
    const [productNewImg, setProductNewImg] = useState<File | null>(null);
    const [categories, setCategories] = useState<Array<{ 'prod_cat_id': number, 'prod_cat_name': string }>>(prod_categories);
    const productFetched = useRef<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false);
    const [productDetail, setProductDetail] = useState<any>({
        'prod_id': null,
        'prod_name': null,
        'prod_category': null,
        'prod_price': null,
        'prod_img': null,
        'prod_inStock': true
    });
    const [crumbs, setCrumbs] = useState<Array<TBreadCrumb>>([
        {
            name: 'admin',
            link: '/admin'
        },
        {
            name: 'products',
            link: '/admin/products'
        },
        {
            name: 'entry',
            link: '/admin/products/entry'
        }
    ]);

    useEffect(() => {
        if (!productFetched.current) {
            if (productId) {
                setEditMode(true)
                getProductDetail(productId)
            }
        }

        return () => {
            productFetched.current = true;
        }

    }, [])

    const getProductDetail = async (id: number) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/products/id/${id}`);
            const data = await response.data.product[0];
            // const updatedProductDetail = { ...productDetail, ...data };
            setProductDetail(data);
            // console.log(updatedProductDetail);
            setCrumbs([...crumbs, { name: data.prod_name, link: `/admin/products/entry/${data.prod_id}` }])
            setProductImg(data.prod_img as string)
        } catch (e) {
            console.error(e)
        }
    }

    const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProductImg(reader.result as string);
                const updatedDetail = { ...productDetail, prod_img: file }
                setProductDetail(updatedDetail);
            }
            reader.readAsDataURL(file)
        }
    }

    const handleNewImgUpload = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                setProductNewImg(file);
                setProductImg(reader.result as string);
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errCount: number = 0;

        Object.keys(productDetail).map((pd: any, index: any) => {
            switch (pd) {
                case 'prod_name':
                    if (productDetail[pd] == null || productDetail[pd] == '') {
                        dispatch(showNotification({ message: `Product name is required`, type: 'error' }))
                        errCount++;
                        return;
                    }
                    break;
                case 'prod_category':
                    if (productDetail[pd] == 'default') {
                        dispatch(showNotification({ message: `Please select product category`, type: 'error' }))
                        errCount++;
                        return;
                    }
                    break;
                case 'prod_price':
                    if (productDetail[pd] == null) {
                        dispatch(showNotification({ message: `Product price is required`, type: 'error' }))
                        errCount++;
                        return;
                    }
                    break;

                default:
                    dispatch(hideConfirm())
            }
        })

        if (productImg == null) {
            dispatch(showNotification({ message: 'Please upload product image', type: 'error' }));
            errCount++;
            return;
        }

        if (errCount == 0) {
            let formData: any = new FormData();
            formData.append('prod_name', productDetail.prod_name);
            formData.append('prod_category', productDetail.prod_category);
            formData.append('prod_price', productDetail.prod_price);
            formData.append('prod_inStock', productDetail.prod_inStock);
            if (editMode) {
                if(productNewImg !== null){
                    formData.append('image', productNewImg);
                }
                const response = await api.patch(`http://localhost:8080/api/v1/products/id/${productDetail.prod_id}`, formData);
                if (response.status == 200) {
                    dispatch(showNotification({ message: 'Product updated Successfully', type: 'success' }));
                    router.push('/admin/products');
                }

                return;
            }

            formData.append('image', productDetail.prod_img);
            const response = await api.post('http://localhost:8080/api/v1/products', formData);
            const data = response.data;
            if (response.status == 201) {
                dispatch(showNotification({ message: 'Product Added Successfully', type: 'success' }));
                const initialState = {
                    'prod_name': null,
                    'prod_category': null,
                    'prod_price': null,
                    'prod_img': null,
                    'prod_inStock': true
                }
                router.push('/admin/products');
            }
        }
    }

    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">
                    Product&nbsp;
                    {editMode ? 'Edit' : 'Entry'}
                </h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <div className="entry-form-container">
                <div className="product-img-container">
                    {
                        productImg === null ? (
                            <label className="upload-img-msg" htmlFor="upload_img">
                                Upload Product Image
                                <input type="file" name="upload_img" id="upload_img" onChange={handleImgUpload} />
                            </label>
                        ) : (

                            <label className="upload-img-msg" htmlFor="upload_img">
                                <div className="img-container">
                                    <img src={productImg} alt="" />
                                </div>
                                <input type="file" name="upload_img" id="upload_img" onChange={handleNewImgUpload} />
                            </label>
                        )
                    }

                </div>
                <form className="entry-form form-layout no-shadow !h-auto" onSubmit={handleFormSubmit}>
                    <div className="form-body !h-auto">
                        <div className="form-row two-col">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" name="name" id="name" className="form-control" value={productDetail?.prod_name} onChange={(e) => setProductDetail({ ...productDetail, prod_name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">Product Category</label>
                                <select name="category" id="category" className="form-control" onChange={(e) => setProductDetail({ ...productDetail, prod_category: e.target.value })}>
                                    <option value="default">--Choose Category--</option>
                                    {
                                        categories.map((cat: any, index: number) => (
                                            <option value={cat.prod_cat_name} key={cat.prod_cat_id} selected={cat.prod_cat_name == productDetail?.prod_category}>{cat.prod_cat_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-row two-col">
                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Product Price</label>
                                <input type="text" name="price" id="price" className="form-control" value={productDetail?.prod_price} onChange={(e) => setProductDetail({ ...productDetail, prod_price: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inStock" className="form-label">Product InStock</label>
                                <div className="radio-container">
                                    <div className="option">
                                        <label htmlFor="true" className="form-label">True</label>
                                        <input type="radio" name="inStock" id="true" className="form-radio" value="true" checked={productDetail.prod_inStock === true} onChange={() => setProductDetail({ ...productDetail, prod_inStock: true })} />
                                    </div>
                                    <div className="option">
                                        <label htmlFor="false" className="form-label">False</label>
                                        <input type="radio" name="inStock" id="false" className="form-radio" value="false" checked={productDetail.prod_inStock === false} onChange={() => setProductDetail({ ...productDetail, prod_inStock: false })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row default">
                            <div className="form-group">
                                <label htmlFor="description" className="form-label">Product Description</label>
                                <textarea name="description" id="description" className="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-actions  lg:!justify-end">
                        {/* <button type="button" className="btn-outline-md">Cancel</button> */}
                        <button type="submit" className="btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEntry;
