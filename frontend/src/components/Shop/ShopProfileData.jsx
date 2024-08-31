import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import { FaFilter } from "react-icons/fa";
import { BiSortAlt2 } from 'react-icons/bi';
import { AiOutlineClose } from "react-icons/ai";
import BasicPagination from "../../pages/BasicPagination";

const ShopProfileData = ({ isOwner }) => {
  const { events } = useSelector((state) => state.events);
  const { products,product, totalPages,totalPage } = useSelector((state) => state.products);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  // const [totalPage, setTotalPages] = useState(1);
  const drawerRef = useRef(null);

console.log("11111111",totalPage)

  useEffect(() => {
    // This will be called every time the query string changes
        dispatch(getAllEventsShop(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    console.log('Product Data:', product); // Log the product data
    console.log('Product Data111111111:', products); // Log the product data
  
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    const sortBy = params.get("sortBy") || "";
    const categories = params.get("categories") || "";
    const gender = params.get("gender") || "";

    dispatch(getAllProductsShop(id, page, sortBy, categories,gender));
  }, [dispatch, id, location.search]);
  
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSortBy(params.get("sortBy") || "");
  }, [location.search]);

  
  const getFirstLetter = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  }
  

  // Function to calculate duration in a human-readable format
  const calculateDuration = (createdAt) => {
    const currentDate = new Date();
    const reviewDate = new Date(createdAt);
    const differenceInTime = currentDate.getTime() - reviewDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays >= 30) {
      const months = Math.floor(differenceInDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (differenceInDays === 1) {
      return '1 day ago';
    } else {
      return `${differenceInDays} days ago`;
    }
  };

  const allReviews = products && products.map((product) => product.reviews).flat();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    // useEffect(() => {
      // window.scrollTo(0, 0);
    // }, []);
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  const handleSortOption = (sortOption) => {
    setCurrentPage(1)
    setSortBy(sortOption);
    const params = new URLSearchParams(location.search);
    
    if (sortOption) {
      params.set('sortBy', sortOption);
    } else {
      params.delete('sortBy');
    }
    
    navigate(`${location.pathname}?${params.toString()}`);
  };
  const handleGenderChange = (gender) => {
    setCurrentPage(1); // Reset the current page to 1
    const params = new URLSearchParams(location.search);
    let genders = params.get('gender') ? params.get('gender').split(',') : [];
  
    if (genders.includes(gender)) {
      // If the gender is already selected, remove it
      genders = genders.filter(g => g !== gender);
    } else {
      // If the gender is not selected, add it
      genders.push(gender);
    }
  
    if (genders.length > 0) {
      // If there are any genders selected, update the query parameter
      params.set('gender', genders.join(','));
    } else {
      // If no genders are selected, remove the gender query parameter
      params.delete('gender');
    }
  
    // Navigate to the updated URL with the new query parameters
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const toggleSortDrawer = () => {
    setSortDrawerOpen(!sortDrawerOpen);
  };
  
  const getCategoryCounts = (product) => {
    const categoryCounts = {};

    product.forEach((p) => {
      const categories = [
        ...(p.subCategory || []),
        ...(p.footwearSubCategories || []),
        ...(p.accessorySubCategories || []),
      ];

      categories.forEach((category) => {
        if (category) {
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      });
    });

    return categoryCounts;
  };
  

  const getUniqueCategories = (product) => {
    const subCategories = product
      .flatMap(p => p.subCategory || []);
  
    const footwearSubCategories = product
      .flatMap(p => p.footwearSubCategories || []);
  
    const accessorySubCategories = product
      .flatMap(p => p.accessorySubCategories || []);
  
    const allCategories = [
      ...subCategories,
      ...footwearSubCategories,
      ...accessorySubCategories
    ];

    const uniqueCategories = [...new Set(allCategories)];
    return uniqueCategories;
  };

  const categoryCounts = getCategoryCounts(product);
  const uniqueCategories = getUniqueCategories(product);

  const formattedCategoryCounts = Object.entries(categoryCounts).map(
    ([category, count]) => `${category}(${count})`
  ).join(", ");



  
  const handleCheckboxChange = (category) => {
    setCurrentPage(1)
    const params = new URLSearchParams(location.search);
    let categories = params.get('categories') ? params.get('categories').split(',') : [];
  
    if (categories.includes(category)) {
      categories = categories.filter(c => c !== category);
    } else {
      categories.push(category);
    }
  
    if (categories.length > 0) {
      params.set('categories', categories.join(','));
    } else {
      params.delete('categories');
    }
  
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  const clearFilters = () => {
    // Clear the query parameters for gender, categories, and sortBy
    setCurrentPage(1)
    setIsDrawerOpen(false);
    const params = new URLSearchParams(location.search);
    params.delete('gender');
    params.delete('categories');
    params.delete('sortBy');

    // Reset the current page to 1
    params.set('page', 1);

    // Navigate to the updated URL
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex justify-between">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />

      {active === 1 && <div>
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-4 border-0">
          {products &&
          products
            .filter(product => product.shop.shopIsActive === false)
            .map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
            
        </div>
        <div className="mb-14 sm:mb-0 flex justify-center">
        <BasicPagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>

      </div>}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events
                .filter(event => event.shop.shopIsActive === false)
                .map((i, index) => (
                  <ProductCard
                    data={i}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
          </div>
          {events &&
            events.filter(event => event.shop.shopIsActive === false).length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Events for this shop!
              </h5>
            )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4" key={index}>
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-slate-200">
                  <div className="w-[50px] h-[50px] flex items-center justify-center text-blue-300 text-3xl font-bold">
                    {getFirstLetter(item?.user?.name)}
                  </div>
                </div>
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{calculateDuration(item.createdAt)}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews for this shop!
            </h5>
          )}
        </div>
      )}

      {/* Mobile view filter section */}
      <div>
      
  <div
    className="hidden md:flex fixed right-5 bottom-24 mb-2 p-4 bg-red-500 rounded-full text-white cursor-pointer"
    onClick={toggleDrawer}
  >
    <FaFilter size={25} />
  </div>
  <div
    className="hidden md:flex fixed right-5 bottom-10 p-4 bg-red-500 rounded-full text-white cursor-pointer"
    onClick={toggleSortDrawer}
  >
    <BiSortAlt2 size={25} />
  </div>
</div>
{/* Filter Drawer */}
<div
              className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={toggleDrawer}
            ></div>
<div className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 z-50`}      ref={drawerRef}>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <button onClick={toggleDrawer} className="text-2xl">
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex items-center gap-4 p-4">
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
        <div className="p-4">
        <h2 className="text-xl font-semibold">Gender</h2>
{['Men', 'Women', 'Unisex'].map((gender) => (
  <label key={gender} className="block mb-2">
    <input
      type="checkbox"
      className="mr-2"
      checked={new URLSearchParams(location.search).get('gender')?.split(',').includes(gender) || false}
      onChange={() => handleGenderChange(gender)}
    />
    {gender}
  </label>
))}
</div>

        <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>

          {Object.entries(categoryCounts).map(([category, count]) => (
            <label key={category} className="block mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={new URLSearchParams(location.search).get('categories')?.split(',').includes(category) || false}
                onChange={() => handleCheckboxChange(category)}
              />
              {category} ({count})
            </label>
          ))}
        </div>
        

      </div>

      {/* Sort Drawer */}
      <div
              className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity ${sortDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={toggleSortDrawer}
            ></div>
      <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-4 border-0">


      <div className={`fixed left-0 bottom-0 w-full bg-white shadow-lg transition-transform transform ${sortDrawerOpen ? 'translate-y-0' : 'translate-y-full'} z-50`}>
  <div className="flex items-center justify-between p-4">
    <h2 className="text-xl font-semibold">Sort By</h2>
    <button onClick={toggleSortDrawer} className="text-2xl">
      <AiOutlineClose />
    </button>
  </div>
  <div className="flex flex-col p-4">
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByPriceLowToHigh"
        name="sortBy"
        className="mr-2 my-2"
        value="Price: Low to High"
        onClick={() => handleSortOption("price-asc")}
        checked={sortBy === "price-asc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByPriceLowToHigh">Price (Low to High)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByPriceHighToLow"
        name="sortBy"
        className="mr-2 my-2"
        value="Price: High to Low"
        onClick={() => handleSortOption("price-desc")}
        checked={sortBy === "price-desc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByPriceHighToLow">Price (High to Low)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByRatingLowToHigh"
        name="sortBy"
        className="mr-2 my-2"
        value="Rating: Low to High"
        onClick={() => handleSortOption("rating-asc")}
        checked={sortBy === "rating-asc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByRatingLowToHigh">Rating (Low to High)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByRatingHighToLow"
        name="sortBy"
        className="mr-2 my-2"
        value="Rating: High to Low"
        onClick={() => handleSortOption("rating-desc")}
        checked={sortBy === "rating-desc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByRatingHighToLow">Rating (High to Low)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByDateOldToNew"
        name="sortBy"
        className="mr-2 my-2"
        value="Date: Old to New"
        onClick={() => handleSortOption("date-asc")}
        checked={sortBy === "date-asc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByDateOldToNew">Date (Old to New)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByDateNewToOld"
        name="sortBy"
        className="mr-2 my-2"
        value="Date: New to Old"
        onClick={() => handleSortOption("date-desc")}
        checked={sortBy === "date-desc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByDateNewToOld">Date (New to Old)</label>
    </div>
  </div>
</div>
</div>

      <div className="md:hidden sticky z-20">
      <div className="fixed bottom-0 left-0 right-0 shadow-md p-2 flex justify-around items-center border-t border-gray-300 bg-zinc-100">
         <button className="flex flex-row items-center space-x-2 p-2 hover:bg-gray-100 rounded" onClick={toggleDrawer}>
        <FaFilter className="w-4 h-4 text-gray-600 opacity-75" />
        <span className="font-bold text-base">FILTER</span>
      </button>
      <div className="w-px h-10 bg-gray-500 opacity-75"></div>
      <button className="flex flex-row items-center space-x-2 p-2 hover:bg-gray-100 rounded" onClick={toggleSortDrawer}>
        <BiSortAlt2 className="w-6 h-6 text-gray-600 opacity-75" />
        <span className="font-bold text-base">SORT</span>
      </button>
      </div>

      </div>          
    </div>
  );
};

export default ShopProfileData;
