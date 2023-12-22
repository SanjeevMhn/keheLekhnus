import Link from "next/link";
import ProductList from "../../(components)/product-list";

type CategoryType = {
  prod_cat_id: number,
  prod_cat_name: string
}

type ParamsType = {
  category?: string
}

export default async function Page({ params }: { params: ParamsType }) {

  const response = await fetch("http://localhost:8080/api/v1/products/categories")
  const { categories } = await response.json();


  return (
    <section className="products-container">
      <aside className="product-categories-list">
        <ul className="category-list">
          <li>
            <Link className={!params.category ? 'list-item active' : 'list-item'} href="/products/">
              All
            </Link>
          </li>
          {
            categories.map((category: CategoryType) => {
              return (
                <li key={category.prod_cat_id}>
                  <Link className={params.category == category.prod_cat_name ? "active list-item capitalize" : "list-item capitalize"} href={`/products/${category.prod_cat_name}`}>
                    {category.prod_cat_name}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </aside>
      <article className="products-list-container">
        <ProductList category={params.category} />
      </article>
    </section>
  )
}
