import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const carouselRef = useRef(null);

  // Filter products where listing is not equal to "Event"
  const filteredProducts = allProducts.filter(
    (product) => product.listing !== "Event"
  );

  const visibleProducts = filteredProducts.slice(0, 10);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollLeft = 0; // Reset to the start if at the end
        }
      }
    }, 2000); // Scroll every 2 seconds

    return () => clearInterval(scrollInterval); // Cleanup interval on component unmount
  }, [visibleProducts]);

  return (
    <div className="relative">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="text-center mb-2">Featured Products</h1>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto overflow-y-hidden scroll-snap-x snap-mandatory gap-5 mb-12 border-0"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer 10+
            WebkitOverflowScrolling: "touch", // Smooth scrolling for mobile devices
          }}
        >
          {visibleProducts && visibleProducts.length !== 0 && (
            <>
              {visibleProducts.map((product, index) => (
                <div
                  className="snap-center shrink-0 w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/6"
                  key={index}
                >
                  <ProductCard data={product} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
