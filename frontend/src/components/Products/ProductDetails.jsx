import React, { useEffect, useState, useRef } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
  AiFillStar,
  AiTwotonePicture
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllProducts } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { RiShareForwardLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { addTocart, updateTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import Cart from "../cart/Cart";
import { BsHandbag } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
// import { BsSortNumericDownAlt } from "react-icons/bs";
import { GiThermometerScale } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import MenUpperSizeChart from "./MenUpperSizeChart";
import MenLowerSizeChart from "./MenLowerSizeChart";
import WomenUpperSizeChart from "./WomenUpperSizeChart";
import WomenLowerSizeChart from "./WomenLowerSizeChart";
import MenUnderWear from "./MenUnderWear";
import WomenVest from "./WomenVest";
import MenVest from "./MenVest";
import WomenUnderWear from "./WomenUnderWear";
import MenLowerHalfPant from "./MenLowerHalfPant";
import MenShoes from "./MenShoes";

const ProductDetails = ({ data }) => {
  const [openCart, setOpenCart] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { allProducts } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const [showDescription, setShowDescription] = useState(false);
  const [a, seta] = useState(0);
  const sectionRef = useRef(null)
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handler to toggle the visibility of SizeChart
  const handleClick = () => {
    setShowSizeChart(!showSizeChart);
    console.log("1111",showSizeChart)
  };
  const closeModal = () => {
    setShowSizeChart(false);
  };
  console.log("ddddddddddddd", select)
  const handleMouseEnter = () => {
    setShowDescription(true);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('Link has been copied to clipboard', {
        autoClose: 1000, // Duration in milliseconds
      });
    }).catch((error) => {
      toast.error('Failed to copy link', {
        autoClose: 1000, // Duration in milliseconds
      });
    });
  };
  const handleMouseLeave = () => {
    setShowDescription(false);
  };
  //const [adminuser,setadminuser]=useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(async()=>{
  //   // const res5 = await axios.get(`${server}/user/user-info/65fae1d3497be0c126658a67`)
  //   const res5 = await axios.get(`${server}/user/user-info/65fae1d3497be0c126658a67`)

  //   setadminuser(res5.data.user)
  // },[])
  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllProductsShop(data && data?.shop._id));
    setIsLoading(false);
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const addToCartHandler2 = async (data, selectedSize, count) => {
    console.log("addToCartHandler2", data._id, selectedSize, count);
    const selectedProduct = data.stock.find(
      (item) => item.size === selectedSize
    );
    if (selectedProduct.quantity < count) {
      toast.error("Insufficient quantity available for the selected size!", {
        autoClose: 1000, // Duration in milliseconds
      });
      return;
    }
    // console.log("id23",id)
    const isItemExists =
      cart &&
      cart.find((i) => {
        return i._id === data._id;
      });
    console.log("item exist", isItemExists);
    if (isItemExists) {

      let newData = JSON.parse(JSON.stringify(isItemExists));
      // console.log("newData1",newData)
      const isExists = newData.stock.some((val) => val.size === selectedSize && val.isSelected === true);

      newData.stock.forEach((val) => {
        if (val.size === selectedSize) {
          val.isSelected = true;
          val.qty = count;
          // val.quantity=val.quantity-count;
        }
      });
      // newData.qty = count;
      console.log("newData2updated", newData);
      let newCart = JSON.parse(JSON.stringify(cart));
      // Find the index of the item in newCart array
      const itemIndex = newCart.findIndex(
        (item) => item._id === isItemExists._id
      );

      if (itemIndex !== -1) {
        // Update the item at the found index with newData
        newCart[itemIndex] = newData;
        console.log("newCart updated", newCart);
      } else {
        console.log("Item not found in newCart array");
      }
      // newCart.forEach((val1)=>{
      //   if(val1._id==isItemExists.id){
      //       val1=newData
      //   }
      // })
      try {
        // await updateStockAfterOrderCreation(itemToUpdate);
        if (isExists) {
          toast.error("Item already in cart!", {
            autoClose: 1000, // Duration in milliseconds
          });
        } else {
          dispatch(updateTocart(newCart));
          toast.success("Item added to cart successfully!", {
            autoClose: 1000, // Duration in milliseconds
          });
        }
      } catch (error) {
        console.error("Error updating stock:", error.message);
        toast.error("Failed to add item to cart!", {
          autoClose: 1000, // Duration in milliseconds
        });
      }
    } else {
      let newData = JSON.parse(JSON.stringify(data));
      // console.log("newData1",newData)

      newData.stock.forEach((val) => {
        if (val.size === selectedSize) {
          val.isSelected = true;
          val.qty = count;
          // val.quantity=val.quantity-count;
        } else {
          val.qty = 0;
        }
      });
      //newData.qty = count;
      console.log("newData2", newData);
      try {
        // await updateStockAfterOrderCreation(itemToUpdate);
        dispatch(addTocart(newData));
        toast.success("Item added to cart successfully!", {
          autoClose: 1000, // Duration in milliseconds
        });
      } catch (error) {
        console.error("Error updating stock:", error.message);
        toast.error("Failed to add item to cart!", {
          autoClose: 1000, // Duration in milliseconds
        });
      }
    }
  };
  const addToCartHandler = async (id, selectedSize, count) => {
    console.log("mycart777", id);
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      // const adminId = data.shop._id;
      // const adminId="65fae1d3497be0c126658a67";
      const sellerId = data?.product.adminCreated;
      // console.log("data.adminCreated",data?.cart[0].adminCreated)

      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
console.log("4444444",data?.subCategory)
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full sm:py-5 lg:py-10">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] relative">
                <div className="md:hidden">
                  <div
                    className="relative overflow-hidden"
                    style={{ width: '100%', height: 'auto', whiteSpace: 'nowrap', overflowX: 'scroll' }}
                  >
                    <div className="flex">
                      {data.images.map((i, index) => (
                        <img
                          key={index}
                          src={`${i?.url}`}
                          alt=""
                          className={`inline-block h-[400px] object-contain border border-gray-300 rounded mr-2 cursor-pointer ${select === index ? "border-blue-500" : ""
                            }`}
                          onClick={() => setSelect(index)}
                          style={{ minWidth: 'calc(100% - 40px)', marginRight: '5px' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt=""
                    className="w-full sm:w-[80%] mx-auto border border-gray-300 m-3 p-1 rounded"
                    style={{ transitionDelay: "800ms" }}
                  />
                </div>
                <div className="absolute top-2 right-2">
                  {click ? (
                    <AiFillHeart
                      size={30}
                      color="red"
                      className="pb-1"
                      title="Remove from wishlist"
                      onClick={() => {
                        removeFromWishlistHandler(data);
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className=" text-gray-600 pb-1"
                      title="Add to wishlist"
                      onClick={() => {
                        addToWishlistHandler(data);
                      }}
                    />
                  )}

                  <IoShareSocialOutline
                    size={30}
                    className="text-gray-600 pt-1 mt-2"
                    title="Share this product"
                    onClick={copyToClipboard}
                  />

                </div>
                <div className="hidden md:block">
                  <div className="w-full flex p-2 py-0 lg:pl-12">
                    {data &&
                      data.images.map((i, index) => (
                        <div
                          key={index}
                          className={`${select === 0 ? "border" : "" // Remove "null"
                            } cursor-pointer`}
                        >
                          <img
                            src={`${i?.url}`}
                            alt=""
                            className="h-[60px] overflow-hidden mr-3 mt-3 sm:hover:cursor"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                  </div>
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-10">
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center">
                    <h1 className={`${styles.productTitle} text-xl font-normal`}>{data.name}</h1>
                  </div>
                  <div className="relative flex items-center mt-1">
                    <h4
                      className={`${styles.productDiscountPrice}{"text-lg font-bold"}`}
                    >
                      ₹{data.discountPrice}
                    </h4>
                    <div className="flex items-center ml-2">
                      <h4 className="text-sm text-gray-500 line-through">
                        ₹{data.originalPrice ? data.originalPrice : null}
                      </h4>
                      <span className="text-sm text-blue-500 font-bold ml-2">
                        ({Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% off)
                      </span>
                    </div>
                    <AiOutlineInfoCircle
                      size={18}
                      className="text-gray-600 ml-2 cursor-pointer"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    {showDescription && (
                      <div className="absolute top-8 left-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute top-0 left-[170px] transform -translate-x-1/2 -translate-y-full">
                          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-200"></div>
                          <div className="w-0 h-0 border-l-7 border-r-7 border-b-7 border-transparent border-b-white mt-[1px]"></div>
                        </div>
                        <h4 className="text-md font-bold">PRICE DETAILS</h4>
                        <hr />
                        <p className="text-sm mt-2">
                          Maximum Retail Price (MRP): ₹{data.originalPrice}
                        </p>
                        <p className="text-sm mb-2">
                          Final Discounted Price: ₹{data.discountPrice}
                        </p>
                        <hr />
                        <p className="text-xs mt-2">
                          MRP is inclusive of all taxes.
                        </p>
                        <p className="text-xs">
                          This product has an MRP (Maximum Retail Price) set by the supplier. As per govt. guidelines.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="relative flex items-center mt-3">
                    <div className="inline-flex rounded-full bg-blue-500 px-3 py-1 mb-2 text-sm"
                      style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}
                    >
                      <b>{averageRating.slice(0, 3)}</b>
                      <AiFillStar className="ml-1" />
                    </div>
                    <span
                      className="flex text-xs mb-2 ml-5 cursor-pointer"
                      onClick={() => {
                        sectionRef.current.scrollIntoView({ behavior: 'smooth' })
                        seta(a + 1)
                      }}
                    >
                      {data.reviews.length} reviews
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
    Try And Buy
  </div>
  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
    Delivers in 90mins
  </div>
  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
    Free Delivery
  </div>
  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
    Hassle-Free Return
  </div>
  
</div>

                </div>
                {/* select size  */}
                <div className="flex items-center pt-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full">
                    <div className="mr-4">
                      <label
                        htmlFor="sizeSelect"
                        className="font-semibold text-gray-800 text-xl lg:text-2xl"
                      >
                        Select Size
                      </label>
                      {(data?.category === "Footwear" ||
  data?.subCategory.includes("T-shirts") ||  
  data?.subCategory.includes("Shirts") ||  
  data?.subCategory.includes("Jeans") ||  
  data?.subCategory.includes("Tops") ||  
  data?.subCategory.includes("Trousers") ||  
  data?.subCategory.includes("Shorts") ||  
  data?.subCategory.includes("Kurta") ||  
  data?.subCategory.includes("Sweaters") ||  
  data?.subCategory.includes("Hoodies") ||  
  data?.subCategory.includes("Skirts") ||  
  data?.subCategory.includes("Leggings") ||  
  data?.subCategory.includes("Jackets") ||  
  data?.subCategory.includes("Coats") ||  
  data?.subCategory.includes("Blazers") ||  
  data?.subCategory.includes("Vests") ||  
  data?.subCategory.includes("Maxi dresses") ||  
  data?.subCategory.includes("Cocktail dresses") ||  
  data?.subCategory.includes("Sundresses") ||  
  data?.subCategory.includes("Sports bras") ||  
  data?.subCategory.includes("Gym tops") ||  
  data?.subCategory.includes("Yoga pants") ||  
  data?.subCategory.includes("Track pants") ||  
  data?.subCategory.includes("Running shorts") ||  
  data?.subCategory.includes("Pajamas") ||  
  data?.subCategory.includes("Robes") ||  
  data?.subCategory.includes("Sweatpants") ||  
  data?.subCategory.includes("Lounge tops") ||  
  data?.subCategory.includes("Half Pants") ||  
  data?.subCategory.includes("Bras") ||  
  data?.subCategory.includes("Panties") ||  
  data?.subCategory.includes("Boxers") ||  
  data?.subCategory.includes("Briefs") ||  
  data?.subCategory.includes("Undershirts") ||  
  data?.subCategory.includes("Suits") ||  
  data?.subCategory.includes("Tuxedos") ||  
  data?.subCategory.includes("Tank tops") ||  
  data?.subCategory.includes("Blouses") ||  
  data?.subCategory.includes("Undergarments") ||  
  data?.subCategory.includes("Kurtis") ||  
  data?.subCategory.includes("Night Suit") ||  
  data?.subCategory.includes("Full Pants") ||  
  data?.subCategory.includes("Co-ords") ||  
  data?.subCategory.includes("Coords") ||  
  data?.subCategory.includes("Palazzos") ||  
  data?.subCategory.includes("Capris") ||  
  data?.subCategory.includes("Body Tuckers") ||  
  data?.subCategory.includes("Three-quarter") ||  
  data?.subCategory.includes("Jeggings") ||  
  data?.subCategory.includes("Lingerie") ||  
  data?.subCategory.includes("Short Kurtis") ||  
  data?.subCategory.includes("Bandis") ||  
  data?.subCategory.includes("Nehru Jackets") ||  
  data?.subCategory.includes("Track suits") ||  
  data?.subCategory.includes("Lungis") ||  
  data?.subCategory.includes("Sweatshirts") ||  
  data?.subCategory.includes("Thermals") ||  
  data?.subCategory.includes("Thermal tops") ||  
  data?.subCategory.includes("Thermal bottoms") ||  
  data?.subCategory.includes("Thermal set") ||  
  data?.subCategory.includes("Dungarees") ||  
  data?.subCategory.includes("Harem pants") ||  
  data?.subCategory.includes("Patiala") ||  
  data?.subCategory.includes("Stockings") ||  
  data?.subCategory.includes("Tights") ||  
  data?.subCategory.includes("Cargo") ||  
  data?.subCategory.includes("Body Suits") ||  
  data?.subCategory.includes("One piece") ||  
  data?.subCategory.includes("Body cons") ||  
  data?.subCategory.includes("Crop tops") ||  
  data?.subCategory.includes("Gowns") ||  
  data?.subCategory.includes("Hot pants")) && (
  <div
    className="text-right font-semibold text-gray-800 text-lg lg:text-xl -mt-9 flex justify-end items-center cursor-pointer"
    onClick={handleClick}
  >
    <span className="transform rotate-90">
      <GiThermometerScale size={48} />
    </span>
    Size Chart
  </div>
)}

      {( 
  (data?.subCategory.includes("Jeans") ||
   data?.subCategory.includes("Trousers") ||
   data?.subCategory.includes("Cargo") ||
   data?.subCategory.includes("Full Pants") ||
   data?.subCategory.includes("Harem pants") ||
   data?.subCategory.includes("Trousers") ||
   data?.subCategory.includes("Thermals") ||
   data?.subCategory.includes("Thermal bottoms") ||
   data?.subCategory.includes("Track pants") ||
   data?.subCategory.includes("Sweatpants"))
   && 
  (data?.gender.includes("Men") || data?.gender.includes("Unisex"))
) 
&& showSizeChart && (
  <MenLowerSizeChart onClose={closeModal} />
)}

{(
  (data?.subCategory.includes("Shirts") ||
   data?.subCategory.includes("Tuxedos") ||
   data?.subCategory.includes("T-shirts") ||
   data?.subCategory.includes("Bandis") ||
   data?.subCategory.includes("Nehru Jackets") ||
   data?.subCategory.includes("Inners") ||
   data?.subCategory.includes("Track suits") ||
   data?.subCategory.includes("Kurta") ||
   data?.subCategory.includes("Sweaters") ||
   data?.subCategory.includes("Hoodies") ||
   data?.subCategory.includes("Jackets") ||
   data?.subCategory.includes("Coats") ||
   data?.subCategory.includes("Blazers")) &&
  (data?.gender.includes("Men") || data?.gender.includes("Unisex"))
) && showSizeChart && (
  <MenUpperSizeChart onClose={closeModal} />
)}

{(
  (data?.subCategory.includes("tops") ||
   data?.subCategory.includes("Shirts") ||
   data?.subCategory.includes("Thermal tops") ||
   data?.subCategory.includes("Crop tops") ||
   data?.subCategory.includes("Gowns") ||
   data?.subCategory.includes("Inners") ||
   data?.subCategory.includes("Body cons") ||
   data?.subCategory.includes("One piece") ||
   data?.subCategory.includes("Frocks") ||
   data?.subCategory.includes("Tank tops") ||
   data?.subCategory.includes("Coords") ||
   data?.subCategory.includes("Short Kurtis") ||
   data?.subCategory.includes("Night Suit") ||
   data?.subCategory.includes("Co-ords") ||
   data?.subCategory.includes("T-shirts") ||
   data?.subCategory.includes("Sweaters") ||
   data?.subCategory.includes("Hoodies") ||
   data?.subCategory.includes("Jackets") ||
   data?.subCategory.includes("Coats") ||
   data?.subCategory.includes("Blazers") ||
   data?.subCategory.includes("Maxi dresses") ||
   data?.subCategory.includes("Sundresses") ||
   data?.subCategory.includes("Gym Tops") ||
   data?.subCategory.includes("Kurtis")) &&
  data?.gender.includes("Women")
) && showSizeChart && (
  <WomenUpperSizeChart onClose={closeModal} />
)}

{(
  (data?.subCategory.includes("Jeans") ||
   data?.subCategory.includes("Trousers") ||
   data?.subCategory.includes("Churidar") ||
   data?.subCategory.includes("Palazzos") ||
   data?.subCategory.includes("Thermal bottoms") ||
   data?.subCategory.includes("Hot pants") ||
   data?.subCategory.includes("Tights") ||
   data?.subCategory.includes("Cargo") ||
   data?.subCategory.includes("Patiala") ||
   data?.subCategory.includes("Stockings") ||
   data?.subCategory.includes("Harem pants") ||
   data?.subCategory.includes("Dungarees") ||
   data?.subCategory.includes("Three-quarter") ||
   data?.subCategory.includes("Jeggings") ||
   data?.subCategory.includes("Shorts") ||
   data?.subCategory.includes("Body Tuckers") ||
   data?.subCategory.includes("Yoga pants") ||
   data?.subCategory.includes("Track pants") ||
   data?.subCategory.includes("Running shorts") ||
   data?.subCategory.includes("Sweatpants") ||
   data?.subCategory.includes("Half pants") ||
   data?.subCategory.includes("Boxers") ||
   data?.subCategory.includes("Leggings")) &&
  data?.gender.includes("Women")
) && showSizeChart && (
  <WomenLowerSizeChart onClose={closeModal} />
)}

{(
  data?.subCategory.includes("Undergarments") || 
  data?.subCategory.includes("Briefs")
) && data?.gender.includes("Men") && showSizeChart && (
  <MenUnderWear onClose={closeModal} />
)}

{(
  (data?.subCategory.includes("Undergarments") || 
   data?.subCategory.includes("Panties") ||
   data?.subCategory.includes("Briefs") ||
   data?.subCategory.includes("Lingerie")) &&
  data?.gender.includes("Women")
) && showSizeChart && (
  <WomenUnderWear onClose={closeModal} />
)}

{data?.subCategory.includes("Vests") ||data?.subCategory.includes("Undershirts") && data?.gender.includes("Men") && showSizeChart && (
  <MenVest onClose={closeModal} />
)}

{(
  data?.subCategory.includes("Bras") || 
  data?.subCategory.includes("Inners") || 
  data?.subCategory.includes("Undershirts") || 
  data?.subCategory.includes("Vests") || 
  data?.subCategory.includes("Sports bras")
) && data?.gender.includes("Women") && showSizeChart && (
  <WomenVest onClose={closeModal} />
)}

{(
  data?.category.includes("Footwear") && 
  (data?.gender.includes("Men") || data?.gender.includes("Unisex") || data?.gender.includes("Women"))
) && showSizeChart && (
  <MenShoes onClose={closeModal} />
)}

{(
  (data?.subCategory.includes("Half pants") || 
   data?.subCategory.includes("Boxers") || 
   data?.subCategory.includes("Yoga pants") || 
   data?.subCategory.includes("Running shorts") || 
   data?.subCategory.includes("Shorts") || 
   data?.subCategory.includes("Three-quarter")) &&
  data?.gender.includes("Men")
) && showSizeChart && (
  <MenLowerHalfPant onClose={closeModal} />
)}

        

      
                      <div className="flex flex-wrap mt-4">
                        {data.stock.map((item) => {
                          // Calculate the isAvailable variable outside of the JSX
                          const isAvailable = item.quantity > 0;

                          // Calculate the button classes based on whether the item is available
                          const sizeButtonClasses = isAvailable
                            ? `mr-2 mb-2 px-3 py-1 border rounded-full focus:outline-none ${selectedSize === item.size
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-100 text-gray-800 border-gray-300"
                            }`
                            : `mr-2 mb-2 px-3 py-1 border rounded-full cursor-not-allowed focus:outline-none bg-gray-300 text-gray-400 border-gray-300 line-through`;
                          return (
                            <button
                              key={item.size}
                              className={sizeButtonClasses}
                              onClick={() => {
                                if (isAvailable) {
                                  setSelectedSize(item.size);
                                }
                              }}
                            // disabled={!isAvailable} // Optionally, you can add this to disable the button if the size is not available
                            >
                              {item.size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button container */}
                <div className="relative" style={{ zIndex: 1 }}>
                  <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg px-2 pt-0 md:hidden" style={{ zIndex: 0 }}>
                    <div className="flex justify-between items-center">
                      {/* Add to Cart Button */}
                      <div
                        className={`${styles.button} !mt-6 !rounded !h-11 flex items-center mr-10 !bg-flipkart-yellow`}
                        onClick={() => {
                          if (selectedSize === "") {
                            toast.error("Please select a size!", {
                              autoClose: 1000, // Duration in milliseconds
                            });
                            return;
                          }
                          const j1 = data.stock.find(
                            (val) => val.size === selectedSize
                          );
                          console.log("object data", data);
                          addToCartHandler2(data, selectedSize, count);
                        }}
                      >
                        <span className="text-white flex items-center font-bold">
                          Add to Cart{" "}
                          <AiOutlineShoppingCart className="ml-2" size={20} />
                        </span>
                      </div>

                      {/* Add to Wishlist Button */}
                      <div
                        className={`${styles.button} !mt-6 !rounded !h-11 flex items-center !bg-flipkart-orange`}
                        onClick={() => {
                          if (selectedSize === "") {
                            toast.error("Please select a size!", {
                              autoClose: 1000, // Duration in milliseconds
                            });
                            return;
                          }
                          const j1 = data.stock.find(
                            (val) => val.size === selectedSize
                          );
                          console.log("object data", data);
                          addToCartHandler2(data, selectedSize, count);
                          setOpenCart(true); // Set the cart to open


                        }}
                      >
                        <span className="text-white flex items-center font-bold">
                          Buy Now

                          <BsHandbag
                            size={20}
                            color="white"
                            className="ml-2"
                            title="Remove from wishlist"
                          />
                        </span>
                      </div>
                      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                    </div>
                  </div>
                </div>

                {/* for large screen */}
                <div className=" hidden md:block items-center mt-6">
                  <div className="flex">
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center mr-10 !bg-flipkart-yellow`}
                      onClick={() => {
                        if (selectedSize === "") {
                          toast.error("Please select a size!", {
                            autoClose: 1000, // Duration in milliseconds
                          });
                          return;
                        }
                        const j1 = data.stock.find(
                          (val) => val.size === selectedSize
                        );
                        console.log("object data", data);
                        addToCartHandler2(data, selectedSize, count);
                      }}
                    >
                      <span className="text-white flex items-center font-bold">
                        Add to Cart{" "}
                        <AiOutlineShoppingCart className="ml-2" size={20} />
                      </span>
                    </div>

                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center !bg-flipkart-orange`}
                      onClick={() => {
                        if (selectedSize === "") {
                          toast.error("Please select a size!", {
                            autoClose: 1000, // Duration in milliseconds
                          });
                          return;
                        }
                        const j1 = data.stock.find(
                          (val) => val.size === selectedSize
                        );
                        console.log("object data", data);
                        addToCartHandler2(data, selectedSize, count);
                        setOpenCart(true); // Set the cart to open


                      }}
                    >
                      <span className="text-white flex items-center font-bold">
                        Buy Now

                        <BsHandbag
                          size={20}
                          color="white"
                          className="ml-2"
                          title="Remove from wishlist"
                        />

                      </span>
                    </div>
                    {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                  </div>
                </div>

                {/* for shop */}
                {/* <div className=" hidden md:block items-center pt-8"> */}
                {/* <div className="flex pt-5">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-slate-200">

                        <BsShop
                          className="w-[50px] h-[50px] text-black-500 object-contain"
                        />

                      </div>
                    </Link> */}

                {/*<img
                      src={`${adminuser?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                />*/}

                {/* <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                          {data.shop.name}
                        </h3>
                      </Link> */}

                {/* <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {adminuser?.name}
                      </h3> */}

                {/* <h5 className="pb-3 text-[15px]" ref={sectionRef}>
                        ({averageRating}/5) Ratings
                      </h5>
                    </div> */}
                {/* <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message1 <AiOutlineMessage className="ml-1" />
                    </span>
                    </div> */}
                {/* </div>
                </div> */}
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            a={a}
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
            sectionRef={sectionRef}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
  a,
}) => {
  const [active, setActive] = useState(1);
  const getFirstLetter = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  }
  useEffect(() => {
    if (a != 0) {
      setActive(2)
    }
  }, [a])
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Shop Profile
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[16px] pb-10 whitespace-pre-line overflow-hidden break-words">
          {data.description.replace(/\\n/g, ' ')}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-slate-200">
                  <div className="w-[50px] h-[50px] flex items-center justify-center text-blue-300 text-3xl font-bold">
                    {getFirstLetter(item?.user?.name)}
                  </div>
                </div>
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-slate-200">

                  <BsShop
                    className="w-[50px] h-[50px] text-black-500 object-contain"
                  />

                </div>
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            {/* <p className="pt-2">{data.shop.description}</p> */}
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              {/* <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5> */}
              {/* <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5> */}
              <Link to={`/shop/preview/${data.shopId}`}>
                <div
                  className={`${styles.button} !bg-flipkart-blue !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;