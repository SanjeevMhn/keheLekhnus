import ProductEntry from "@/app/(components)/product-entry";

export default async function Page({ params }:{params: {productId: number}}) {
    const response = await fetch('http://localhost:8080/api/v1/products/categories');
    const { categories } = await response.json();
    return (
      <ProductEntry productId={params.productId} prod_categories={categories} />
    )
}