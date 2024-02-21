'use client'

import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb"
import DataTable, { Columns, PagerConfig } from "@/app/(components)/data-table"
import api from "@/app/service/interceptor/interceptor";
import { useEffect, useRef, useState } from "react"

export default function Page() {
    const [users, setUsers] = useState<Array<any>>([]);
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 6,
        totalPages: 1
    })
    const usersFetched = useRef<boolean>(false);

    useEffect(() => {
        if (!usersFetched.current) {
            getUsers();
        }
        return () => {
            usersFetched.current = true
        }
    })

    const getUsers = async (pageSize: number = 5, page:number = 1) => {
        try {
            const users = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users?pageSize=${pageSize}&page=${page}`);
            const data = await users.data;
            setUsers(data.users);
            setPagerConfig({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize
            })
        } catch (err) {
            console.error(err);
        }
    }

    const crumbs: Array<TBreadCrumb> = [
        {
            name: 'admin',
            link: '/admin'
        },
        {
            name: 'users',
            link: '/users'
        }
    ]

    const columns: Array<Columns> = [
        {
            title: 'image',
            field: 'user_img'
        },
        {
            title: 'name',
            field: 'user_name'
        },
        {
            title: 'email',
            field: 'user_email',
        },
        {
            title: 'auth provider',
            field: 'authProvider'
        }
    ]

    const handlePagination = (page: number) => {
        getUsers(pagerConfig.pageSize,page);
    }

    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">Users List</h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <DataTable 
                columns={columns} 
                data={users} 
                pagerConfig={pagerConfig}
                onPaginate={handlePagination} />
        </div>
    )
}