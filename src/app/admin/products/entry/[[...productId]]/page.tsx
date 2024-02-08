import ProductEntry from "@/app/(components)/product-entry";

export default async function Page({ params }:{params: {productId: number}}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/products/categories`, { cache: "no-cache" });
    const { categories } = await response.json();
    return (
      <ProductEntry productId={params.productId} prod_categories={categories} />
    )
}
