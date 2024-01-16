'use client'
import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import DataTable, { Columns, PagerConfig } from "@/app/(components)/data-table";
import { showConfirm } from "@/app/lib/confirmation/confirmationSlice";
import { showNotification } from "@/app/lib/notifications/notificationSlice";
import api from "@/app/service/interceptor/interceptor";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
    // const response = await fetch('http://localhost:8080/api/v1/products', { cache: 'no-cache', headers:{ 'Cache-Control' : 'no-cache' } })
    // const { products } = await response?.json();
    const [products, setProducts] = useState<Array<any>>([])
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 6,
        totalPages: 1
    })
    const productsFetched = useRef<boolean>(false);
    const [searchText, setSearchText] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const getProducts = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/v1/products');
            const data = await response.data;
            setProducts(data.products);
            setPagerConfig({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize
            })

        } catch (e) {
            console.error(e);
        }

    }
    useEffect(() => {
        if (!productsFetched.current) {
            getProducts();
        }
        return () => {
            productsFetched.current = true;
        }
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            try {
                if (searchText !== null && searchText !== '') {
                    const response = await api.get(`http://localhost:8080/api/v1/products/name?prod_name=${searchText}`);
                    const data = await response.data;
                    setProducts(data.products);
                }else{
                    getProducts();
                }
            } catch (e) {
                console.error(e)
            }
        }, 900)

        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchText])



    const crumbs: Array<TBreadCrumb> = [
        {
            name: 'admin',
            link: '/admin'
        },
        {
            name: 'products',
            link: '/admin/products'
        },
    ]

    const gridCol: Array<Columns> = [
        {
            title: 'id',
            field: 'prod_id',
            hidden: true,
        },
        {
            title: 'image',
            field: 'prod_img'
        },
        {
            title: 'name',
            field: 'prod_name'
        },
        {
            title: 'category',
            field: 'prod_category'
        },
        {
            title: 'inStock',
            field: 'prod_inStock'
        },
        {
            title: 'price',
            field: 'prod_price'
        }
    ]

    const handleProductEdit = (id: number) => {
        router.push(`/admin/products/entry/${id}`)
    }

    const handleProductDelete = (id: number) => {
        dispatch(showConfirm({
            message: 'Do you want to delete this product',
            onConfirm: async () => {
                try {
                    const response = await api.delete(`http://localhost:8080/api/v1/products/id/${id}`);
                    if (response.status == 200) {
                        dispatch(showNotification({ message: 'Product deleted successfully', type: 'success' }));
                        getProducts();
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }))

    }

    const handlePagination = async (page: number) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/products?page=${page}&pageSize=${pagerConfig.pageSize}`);
            const data = await response.data;
            setProducts(data.products);
            setPagerConfig({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize
            })
        } catch (e) {
            console.error(e)
        }
    }

    const handleChangePageSize = async (pageSize: number) => {
        try {
            const response = await api.get(`http://localhost:8080/api/v1/products?page=${1}&pageSize=${pageSize}`);
            const data = await response.data;
            setProducts(data.products);
            setPagerConfig({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize
            })
        } catch (e) {
            console.error(e)
        }
    }

    const handleSearch = (search: string) => {
        setSearchText(search)
    }

    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">Products List</h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <DataTable columns={gridCol} data={products} pagerConfig={pagerConfig} onEditAction={handleProductEdit} onDeleteAction={handleProductDelete} onPaginate={handlePagination} onPageSizeChange={handleChangePageSize} onSearch={handleSearch} />
        </div>
    )
}