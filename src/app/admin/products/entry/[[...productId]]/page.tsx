import ProductEntry from "@/app/(components)/product-entry";

export default function Page({ params }:{params: {productId: number}}) {
    return (
      <ProductEntry productId={params.productId} />
    )
}