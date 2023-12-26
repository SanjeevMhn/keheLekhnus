import ProductList from "../(components)/product-list";

type CategoryType = {
  prod_cat_id: number,
  prod_cat_name: string
}

type ParamsType = {
  category?: string
}

export default async function Page({params}:{params: ParamsType}) {

  const response = await fetch("http://localhost:8080/api/v1/products/categories")
  const { categories } = await response.json();

  return (
    <section className="products-container">
      <aside className="product-categories-list">
        <ul className="category-list">
          <li className="list-item active">All</li>
          {
            categories.map((category:CategoryType) => {
              return (
                <li className="list-item capitalize" key={category.prod_cat_id}>
                  {category.prod_cat_name}
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
