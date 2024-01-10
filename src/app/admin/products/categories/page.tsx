'use client'
import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import DataTable from "@/app/(components)/data-table";
import api from "@/app/service/interceptor/interceptor"
import { useEffect, useState } from "react";

export default function Page() {
    const [categories, setCategories] = useState<Array<any>>([]);
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

    const gridCol: Array<{ title: string, field: string }> = [
        {
            title: 'id',
            field: 'cat_id'
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

    const getCategories = async () => {
        const response = await api.get('http://localhost:8080/api/v1/categories')
        const data = await response.data.categories;
        setCategories([...categories, ...data]);
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">Categories List</h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <DataTable columns={gridCol} data={categories} />
        </div>
    )
}