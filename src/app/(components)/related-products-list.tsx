'use client'
import { FC, useRef, useState } from "react"
import ProductCard from "./product-card";

const RelatedProductsList: FC<{ products: Array<any> }> = ({ products }) => {
  const scrollDiv = useRef<HTMLUListElement>(null);
  const [leftScrolled, setLeftScrolled] = useState<boolean>(false);

  const handleScrollLeft = () => {
    if (scrollDiv.current) {
      setLeftScrolled(true);
      scrollDiv.current.scrollLeft += 800;
    }
  }

  const handleScrollRight = () => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollLeft -= 800;
      if (scrollDiv.current.scrollLeft == 0) {
        setLeftScrolled(false);
      }
    }
  }
  return (
    <div className="related-products-container">
      <h2 className="title">Related Products</h2>
      <div className="related-products">
        <ul className="related-product-list" ref={scrollDiv}>
          {
            products.map((product: any, index: number) => (
              <li className="list-item" key={index}>
                <ProductCard product={product} />
              </li>
            ))
          }
        </ul>
        {
          leftScrolled ? (
            <button type="button" className="btn btn-prev" onClick={handleScrollRight}>
              <span className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
              </span>
            </button>
          ) : null
        }

        {
          products.length > 3 ? (
            <button type="button" className="btn btn-next" onClick={handleScrollLeft}>
              <span className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
              </span>
            </button>
          ) : null
        }

      </div>
    </div>
  )
}

export default RelatedProductsList;
