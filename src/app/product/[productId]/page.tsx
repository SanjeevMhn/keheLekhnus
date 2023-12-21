export default async function ProductDetail({ params }: { params: { productId: number } }) {

    const response = await fetch(`http://localhost:8080/api/v1/products/id/${params.productId}`);
    const { product } = await response.json();
    return (
        <section className="p-8 p-md-11 p-lg-24">
            <div className="product-detail-container shadow-xl">
                <div className="img-container">
                    <img src={product[0].prod_img} alt="" srcset="" />
                </div>
                <div className="product-detail">
                    <h2 className="product-name text-[35px]">
                        {product[0].prod_name}
                    </h2>
                    <p className="product-price text-[22px]">
                        Rs.&nbsp;{product[0].prod_price}
                    </p>
                </div>
            </div>
        </section>
    )
}