import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (allProducts) {
      const filteredData = allProducts.filter((product) => product.listing !== "Event");
      const sortedData = filteredData.sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData.slice(0, 10);
      setData(firstFive);
    }
  }, [allProducts]);

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
  }, [data]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="text-center mb-2">Best Deals</h1>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-snap-x snap-mandatory gap-5 mb-12 border-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
        >
          <style>
            {`
              .scroll-container::-webkit-scrollbar {
                display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
              }
            `}
          </style>
          {data && data.length !== 0 && (
            <>
              {data.map((product, index) => (
                <div
                  key={index}
                  className="snap-center shrink-0 w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/6"
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

export default BestDeals;
