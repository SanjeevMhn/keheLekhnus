import ProductDetailCard from "@/app/(components)/product-detail-card";

type ParamsType = {
    productId: number
}
export default async function ProductDetail({ params }: { params: ParamsType }) {
    const response = await fetch(`http://localhost:8080/api/v1/products/id/${params.productId}`,{ cache:'no-store' });
    const { product } = await response.json();

    return (
        <ProductDetailCard product={product[0]} />
    )
}