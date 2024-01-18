import BreadCrumb, { TBreadCrumb } from "@/app/(components)/breadcrumb";
import { Columns } from "@/app/(components)/data-table";
import RecentOrdersGrid from "@/app/(components)/recent-orders-grid";

export default function Page() {
    const crumbs: Array<TBreadCrumb> = [
        {
            name: 'admin',
            link: '/admin/'
        },
        {
            name: 'orders',
            link: '/admin/orders'
        }
    ]

    const columns: Array<Columns> = [
        {
            title: 'Order Id',
            field: 'order_id',
            hidden: true,
        },
        {
            title: 'Order Number',
            field: 'order_number',
        },
        {
            title: 'Order Date',
            field: 'order_date'
        },
        {
            title: 'Order Status',
            field: 'order_status'
        },
        {
            title: 'User Name',
            field: 'user_name'
        },
        {
            title: 'User Email',
            field: 'user_email'
        },
        {
            title: 'User Type',
            field: 'user_type'
        },
        {
            title: 'User Contact',
            field: 'user_contact'
        },
        {
            title: 'Delivery Address',
            field: 'delivery_address'
        },
        {
            title: 'Order Total',
            field: 'order_total'
        },
        {
            title: 'Payment Status',
            field: 'payment_status'
        },
        {
            title: 'Payment Type',
            field: 'payment_type'
        }
    ]
    return (
        <div className="grid-container">
            <div className="header">
                <h2 className="page-title">Order List</h2>
                <BreadCrumb crumbs={crumbs} />
            </div>
            <RecentOrdersGrid propColumns={columns} />
        </div>
    )
}