"use client"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import BreadCrumb, { TBreadCrumb } from "./breadcrumb";
import api from "../service/interceptor/interceptor";

const ProductEntry: FC<{ productId: number }> = ({ productId }) => {
    const [productImg, setProductImg] = useState<string | null>(null);
    const [categories, setCategories] = useState<any>([]);
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
    const [productDetail, setProductDetail] = useState<any | null>(null)
    const productFetched = useRef<boolean>(false)

    useEffect(() => {
        if (!productFetched.current) {
            getCategories();
            if (productId) {
                getProductDetail(productId)
            }
        }

        return () => {
            productFetched.current = true;
        }

    }, [])

    const getCategories = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/v1/categories');
            const data = await response.data.categories;
            setCategories([...categories, ...data])
        } catch (e) {
            console.error(e)
        }
    }

    const getProductDetail = async (id: number) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/products/id/${id}`);
            const data = await response.data.product[0];
            setProductDetail(data);
            console.log(data);
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
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">
                    Product&nbsp;
                    { productDetail !== null && Object.keys(productDetail).length !== 0 ? 'Edit' : 'Entry' }
                </h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <div className="data-table-container entry-form-container">
                <div className="product-img-container">
                    {
                        productImg === null ? (
                            <label className="upload-img-msg" htmlFor="upload_img">
                                Upload Product Image
                                <input type="file" name="upload_img" id="upload_img" onChange={handleImgUpload} />
                            </label>
                        ) : (
                            <div className="img-container">
                                <img src={productImg} alt="" />
                            </div>
                        )
                    }

                </div>
                <form className="entry-form form-layout no-shadow">
                    <div className="form-body">
                        <div className="form-row three-col">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" name="name" id="name" className="form-control" value={productDetail?.prod_name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">Product Category</label>
                                <select name="category" id="category" className="form-control" value={productDetail?.prod_category}>
                                    <option value="default">--Choose Category--</option>
                                    {
                                        categories.map((cat: any, index: number) => (
                                            <option value={cat.category_name} key={cat.cat_id}>{cat.category_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-row three-col">
                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Product Price</label>
                                <input type="text" name="price" id="price" className="form-control" value={productDetail?.prod_price} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inStock" className="form-label">Product InStock</label>
                                <div className="radio-container">
                                    <div className="option">
                                        <label htmlFor="true" className="form-label">True</label>
                                        <input type="radio" name="inStock" id="true" className="form-radio" checked={productDetail?.prod_inStock} />
                                    </div>
                                    <div className="option">
                                        <label htmlFor="false" className="form-label">False</label>
                                        <input type="radio" name="inStock" id="false" className="form-radio" checked={!productDetail?.prod_inStock} />
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
                    <div className="form-actions !justify-end">
                        <button type="cancel" className="btn-outline-md">Cancel</button>
                        <button type="submit" className="btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEntry;