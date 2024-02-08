'use client'

import { FC, useEffect, useRef, useState } from "react"
import DataTable, { Columns, PagerConfig } from "./data-table"
import api from "../service/interceptor/interceptor";

const ProductOrderFrequencyGrid:FC = () => {

    const [products, setProducts] = useState<Array<any>>([]);
    const [pagerConfig, setPagerConfig] = useState<PagerConfig>({
        currentPage: 1,
        pageSize: 6,
        totalPages: 1
    })
    const productsFetched = useRef<boolean>(false);

    useEffect(() => {
        if(!productsFetched.current){
            getProducts();
        }
        return () => {
            productsFetched.current = true;
        }
    },[])

    const getProducts = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await api.get(`${baseUrl}/orders/repeatedProducts`);
            const data = await response.data;
            setProducts(data.products);
            setPagerConfig({
                currentPage: data.currentPage,
                pageSize: data.pageSize,
                totalPages: data.totalPages
            });
        }catch(e){
            console.error(e)
        }
    }

    const columns: Array<Columns> = [
        {
            title: 'Product Name',
            field: 'prod_name'
        },
        {
            title: 'Category',
            field: 'prod_category'
        },
        {
            title: 'image',
            field: 'image'
        },
        {
            title: 'Price',
            field: 'prod_price'
        },
        {
            title: 'Frequency',
            field: 'frequency'
        }
    ]

    return (
        <DataTable 
            title="Most Ordered Products" 
            showActionCol={false}
            columns={columns} 
            data={products} 
            pagerConfig={pagerConfig} />
    )
}

export default ProductOrderFrequencyGrid;
