'use client'
import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import CategoryEntry from "@/app/(components)/category-entry";
import DataTable, { Columns, PagerConfig } from "@/app/(components)/data-table";
import { TAuthState } from "@/app/lib/auth/authSlice";
import { showConfirm } from "@/app/lib/confirmation/confirmationSlice";
import { DialogState, hideDialog, showDialog } from "@/app/lib/dialog/dialogSlice";
import { showNotification } from "@/app/lib/notifications/notificationSlice";
import api from "@/app/service/interceptor/interceptor"
import axios, { AxiosRequestConfig } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [categories, setCategories] = useState<Array<any>>([]);
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    })
    const authUser: TAuthState = useSelector((state: any) => state.auth);
    const dialogState: DialogState = useSelector((state: any) => state.dialog);
    const dispatch = useDispatch();
    const categoriesFetched = useRef<boolean>(false)
    const [searchText, setSearchText] = useState<string | null>(null)
    const crumbs: Array<TBreadCrumb> = [
        {
            name: 'admin',
            link: '/admin'
        },
        {
            name: 'products',
            link: '/admin/products'
        },
        {
            name: 'categories',
            link: '/admin/categories'
        }
    ]

    const gridCol: Array<Columns> = [
        {
            title: 'id',
            field: 'cat_id',
            hidden: true
        },
        {
            title: 'name',
            field: 'category_name'
        },
        {
            title: 'Product Count',
            field: 'product_count'
        }
    ]

    const getCategories = async (pageSize = 5, page = 1) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/categories?page=${page}&pageSize=${pageSize}`)
            const data = await response.data;
            setCategories(data.categories);
            setPagerConfig({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize,
            })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (!categoriesFetched.current) {
            getCategories();
        }
        return () => {
            categoriesFetched.current = true;
        }

    }, [])

    useEffect(() => {
        if(dialogState.result){
            getCategories();
        }
    },[dialogState])

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            try{
                if(searchText !== null && searchText !== ''){   
                    const response = await api.get(`http://localhost:8080/api/v1/categories/name?category_name=${searchText}`);
                    const data = response.data;
                    setCategories(data.categories);
                }else{
                    getCategories();
                }
            }catch(e){
                console.error(e)
            }
        },900)

        return () => {
            clearTimeout(timeoutId)
        }
    },[searchText])

    const handleAddCategory = () => {
        dispatch(showDialog({
            title: 'Add Category',
            component: CategoryEntry
        }))
    }

    const handleCategoryEdit = (id: number) => {
        // const params = new URLSearchParams(searchParams.toString())
        // params.set('id', String(id));
        // router.push(pathName + '?' + params);
        dispatch(showDialog({
            title: 'Edit Category',
            data: { cat_id: id },
            component: CategoryEntry
        }))
    }

    const handleCategoryDelete = (id: number) => {
        dispatch(showConfirm({
            message: 'Delete this category?',
            onConfirm: async () => {
                try {
                    const response = await api.delete(`http://localhost:8080/api/v1/categories/id/${id}`);
                    if (response.status == 200) {
                        dispatch(showNotification({
                            message: 'Category deleted successfully',
                            type: 'success'
                        }))
                        getCategories();
                        router.refresh();
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }))
    }

    const handlePagination = async (page: number) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/categories?page=${page}`);
            const data = await response.data;
            setCategories(data.categories);
            setPagerConfig({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangePageSize = (pageSize: number) => {
        getCategories(pageSize);
    }

    const handleSearch = (search: string) => {
        setSearchText(search);
    }


    return (
        <div className="grid-container">
            <div className="header">
                <div className="group">
                    <h2 className="page-title">Categories List</h2>

                </div>
                <button className="btn btn-primary ml-auto mr-5" onClick={handleAddCategory}>
                    Add Category
                </button>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <DataTable columns={gridCol} data={categories} pagerConfig={pagerConfig} onEditAction={handleCategoryEdit} onDeleteAction={handleCategoryDelete} onPaginate={handlePagination} onPageSizeChange={handleChangePageSize} onSearch={handleSearch} />
        </div>
    )
}