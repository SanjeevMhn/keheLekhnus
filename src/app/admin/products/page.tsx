import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import DataTable from "@/app/(components)/data-table";

export default async function Page() {
    const response = await fetch('http://localhost:8080/api/v1/products', { cache: 'no-cache' })
    const { products } = await response?.json();
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

    const gridCol: Array<{ title: string, field: string }> = [
        {
            title: 'id',
            field: 'prod_id',
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
    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">Products List</h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <DataTable columns={gridCol} data={products} />
        </div>
    )
}