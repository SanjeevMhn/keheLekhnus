import ProductDetailCard from "@/app/(components)/product-detail-card";
import BreadCrumb from "@/app/(components)/breadcrumb";
import { TBreadCrumb } from "@/app/(components)/breadcrumb";

type ParamsType = {
  productId: number;
};
export default async function ProductDetail({
  params,
}: {
  params: ParamsType;
}) {
  const response = await fetch(
    `http://localhost:8080/api/v1/products/id/${params.productId}`,
    { cache: "no-store" },
  );
  const { product } = await response.json();
  const crumbs: Array<TBreadCrumb> = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "products",
      link: "/products",
    },
    {
      name: `${product[0].prod_category}`,
      link: `/products/${product[0].prod_category}`,
    },
    {
      name: `${product[0].prod_name}`,
      link: `/product/${product[0].prod_id}`,
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <ProductDetailCard product={product[0]} />
    </>
  );
}
