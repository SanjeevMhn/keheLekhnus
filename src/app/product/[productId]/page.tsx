import ProductDetailCard from "@/app/(components)/product-detail-card";
import BreadCrumb from "@/app/(components)/breadcrumb";
import { TBreadCrumb } from "@/app/(components)/breadcrumb";
import RelatedProductsList from "@/app/(components)/related-products-list";

type ParamsType = {
  productId: number;
};
export default async function ProductDetail({
  params,
}: {
  params: ParamsType;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${baseUrl}/products/id/${params.productId}`,
    { cache: "no-store" },
  );
  const { product } = await response.json();
  const relatedProductsResponse = await fetch(
    `${baseUrl}/products/category/related/${product[0].prod_category}?prod_id=${product[0].prod_id}`,
    { cache: "no-store" },
  )
  const { products } = await relatedProductsResponse.json();

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
    <div className="main-wrapper">
      <BreadCrumb crumbs={crumbs} />
      <ProductDetailCard product={product[0]} />
      {
        products && products.length > 0 ? (
          <RelatedProductsList products={products} />
        ):( null )
      }
    </div>
  );
}
