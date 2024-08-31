


import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatUserAddress } from "../../redux/actions/user"; // Import your action
import axios from "axios";
import { server } from "../../server";
import { getAllSellers } from "../../redux/actions/sellers";

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altphoneNumber, setAltPhoneNumber] = useState("");
  const [landmark, setLandMark] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [lastUsedAddress, setLastUsedAddress] = useState(null);
  const navigate = useNavigate();
  const [shopId, setShopId] = useState("");
  const [couponId, setCouponId] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountPrice2, setDiscountPrice2] = useState(null);


  useEffect(() => {
    const lastUsed = user.addresses.find((address) => address.isLastUsed);
    if (lastUsed) {
      setLastUsedAddress(lastUsed);
      setUsername(lastUsed.userName);
      setPhoneNumber(lastUsed.phoneNumber);
      setAltPhoneNumber(lastUsed.altphoneNumber);
      setCity(lastUsed.city);
      setLandMark(lastUsed.landmark);
      setAddress1(lastUsed.address1);
      setAddress2(lastUsed.address2);
      setZipCode(lastUsed.zipCode);
    }
  }, [user]);

  useEffect(() => {
    console.log("checkout cart data", cart);
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = async () => {
    if (
      username === "" ||
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      phoneNumber === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!",{
        autoClose:2000, // Duration in milliseconds
        });
    } else {
      const shippingAddress = {
        userName: username,
        address1,
        address2,
        zipCode,
        phoneNumber,
        altphoneNumber,
        landmark,
        city,
        isLastUsed: true,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        shopId,
        couponId,
        discount,
        user,
      };

      // Check if the selected address is the last used address and form is disabled
      if (selectedAddressIndex === null && lastUsedAddress) {
        // Do not push the last used address to the database
      } else if (selectedAddressIndex === null) {
        dispatch(
          updatUserAddress(
            {
              userName: username,
              phoneNumber,
              altphoneNumber,
              landmark,
              city,
              address1,
              address2,
              zipCode,
              addressType: "Home",
              isLastUsed: true,
            }
          )
        ); // Dispatch action
      } else {
        const selectedAddress = user.addresses[selectedAddressIndex];
        dispatch(
          updatUserAddress(
            {
              ...selectedAddress,
              isLastUsed: true,
            }
          )
        );
      }

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.stock.reduce(
      (itemAcc, stockItem) => itemAcc + stockItem.qty * item.discountPrice,
      0
    );
    return acc + itemTotal;
  }, 0);

  const shipping = subTotalPrice * 0;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = couponCode;
// console.log("222222",name)
// console.log("3333333",couponCode)

//     await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
//       const shopId = res.data.couponCode?.shopId;
//       console.log("44444444",shopId)

//       const couponCodeValue = res.data.couponCode?.percentage;
//       console.log("555555",couponCodeValue)

//       if (res.data.couponCode !== null) {
//         const isCouponValid = cart && cart.filter((item) => item.shopId === shopId);
//         console.log("666666666",isCouponValid)

//         if (isCouponValid.length === 0) {
//           toast.error("Coupon code is not valid for this shop",{
//             autoClose:2000, // Duration in milliseconds
//             });
//           setCouponCode("");
//         } else {
//           const eligiblePrice = isCouponValid.reduce(
//             (acc, item) => acc + (1 * item.discountPrice),
//             0
//           );
//           console.log("zzzzzzzzzzz",eligiblePrice)

//           const discountPrice = (eligiblePrice * couponCodeValue) / 100;
//           console.log("777777777",discountPrice)
//           setDiscountPrice(discountPrice);
//           console.log("8888888888",res.data.couponCode)
//           setCouponCodeData(res.data.couponCode);
//           setCouponCode("");
//         }
//       }
//       if (res.data.couponCode === null) {
//         toast.error("Coupon code doesn't exist!",{
//           autoClose:2000, // Duration in milliseconds
//           });
//         setCouponCode("");
//       }
//     });
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const name = couponCode;

//   try {
//     const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
//     const coupon = res.data.couponCode;

//     if (coupon) {
//       const shopId = coupon.shopId;
//       const couponValue = coupon.value;
//       const minAmount = coupon.minAmount;
//       const maxAmount = coupon.maxAmount;

//       // Filter items from the cart that belong to the same shop as the coupon
//       const isCouponValid = cart.filter((item) => item.shopId === shopId);

//       if (isCouponValid.length === 0) {
//         toast.error("Coupon code is not valid for this shop", {
//           autoClose: 2000,
//         });
//         setCouponCode("");
//       } else {
//         // Calculate the total eligible price for items from this shop
//         const eligiblePrice = isCouponValid.reduce(
//           (acc, item) => acc + item.discountPrice,
//           0
//         );

//         if (eligiblePrice < minAmount) {
//           toast.error(
//             `Minimum order amount of ${minAmount} is required to use this coupon`,
//             {
//               autoClose: 2000,
//             }
//           );
//         } else if (eligiblePrice > maxAmount) {
//           toast.error(
//             `Maximum order amount to use this coupon is ${maxAmount}`,
//             {
//               autoClose: 2000,
//             }
//           );
//         } else {
//           const discountPrice = (eligiblePrice * couponValue) / 100;
//           setDiscountPrice(discountPrice);
//           setCouponCodeData(coupon);
//           setCouponCode("");
//         }
//       }
//     } else {
//       toast.error("Coupon code doesn't exist!", {
//         autoClose: 2000,
//       });
//       setCouponCode("");
//     }
//   } catch (error) {
//     toast.error("An error occurred while applying the coupon", {
//       autoClose: 2000,
//     });
//   }
// };
const { sellers } = useSelector((state) => state.seller);

useEffect(() => {
  dispatch(getAllSellers());
}, [dispatch]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const name = couponCode;
  console.log("Coupon Code:", name);

  try {
    const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
    const couponCodeValue = res.data.couponCode?.percentage;
    const shopid = res.data.couponCode?.shopId;
    const couponid = res.data.couponCode?._id;
    setShopId(shopid);
    setCouponId(couponid);

    const maxAmount = res.data.couponCode?.maxAmount;
    console.log("Coupon Value:", couponCodeValue);
    console.log("shopid shopid:", shopid);

    if (res.data.couponCode !== null) {
      let discountPrice = (subTotalPrice * couponCodeValue) / 100;
      let discountPrice2 = (subTotalPrice * 2) / 100;

      console.log("Calculated Discount Price:", discountPrice);

      if (discountPrice2 > maxAmount) {
        discountPrice2 = maxAmount;
      }
      

      setDiscountPrice(discountPrice);
      setDiscountPrice2(discountPrice2)
      console.log("Final Discount Price:", discountPrice);
      setCouponCodeData(res.data.couponCode);
      setCouponCode("");
    } else {
      toast.error("Coupon code doesn't exist!", {
        autoClose: 2000, // Duration in milliseconds
      });
      setCouponCode("");
    }
  } catch (error) {
    toast.error("An error occurred while applying the coupon", {
      autoClose: 2000, // Duration in milliseconds
    });
  }
};

useEffect(() => {
  if (discountPrice2 !== null) {
    setDiscount(discountPrice2);
  }
}, [discountPrice2]);



  const discountPercentenge = couponCodeData ? discountPrice : "";
  // setDiscount(discountPercentenge);
  console.log("99999999999999",discountPercentenge);
  console.log("aaaaaaaaaaaaaa",couponCodeData);
  console.log("bbbbbbbbbbbbbbbbbb",subTotalPrice);
  console.log("ccccccccccccccccccc",discountPrice);
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log("11111111111111",totalPrice);
  

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            username={username}
            setUsername={setUsername}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            altphoneNumber={altphoneNumber}
            setAltPhoneNumber={setAltPhoneNumber}
            landmark={landmark}
            setLandMark={setLandMark}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            selectedAddressIndex={selectedAddressIndex}
            setSelectedAddressIndex={setSelectedAddressIndex}
            lastUsedAddress={lastUsedAddress}
            setLastUsedAddress={setLastUsedAddress}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      {/* for mobile view */}
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 shadow-lg p-4 md:hidden" style={{ zIndex: 0 }}>
          <div
            className="w-full max-w-[280px] mx-auto flex justify-center items-center  !bg-flipkart-orange rounded-lg py-3 cursor-pointer transition-transform transform hover:scale-105 active:scale-95"
            onClick={paymentSubmit}
          >
            <h5 className="text-white font-semibold">Go to Payment</h5>
          </div>
        </div>
      </div>
      {/* for larger screen */}
      <div
        className="w-full max-w-[280px] mt-10 hidden md:flex justify-center items-center bg-flipkart-orange rounded-lg py-3 cursor-pointer transition-transform transform hover:scale-105 active:scale-95"
        onClick={paymentSubmit}
      >
        <h5 className="text-white font-semibold">Go to Payment</h5>
      </div>


    </div>
  );
};

const ShippingInfo = ({
  user,
  username,
  setUsername,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  phoneNumber,
  setPhoneNumber,
  altphoneNumber,
  setAltPhoneNumber,
  landmark,
  setLandMark,
  zipCode,
  setZipCode,
  selectedAddressIndex,
  setSelectedAddressIndex,
  lastUsedAddress,
  setLastUsedAddress,
}) => {
  const handleSavedAddressClick = (index, item) => {
    setSelectedAddressIndex(index);
    setUsername(item.userName);
    setAddress1(item.address1);
    setAddress2(item.address2);
    setAltPhoneNumber(item.altphoneNumber);
    setLandMark(item.landmark);
    setZipCode(item.zipCode);
    setPhoneNumber(item.phoneNumber);
    setCity(item.city);
  };

  const handleChooseSavedAddressClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    setUserInfo(!userInfo);
  };

  const handleAddNewAddressClick = () => {
    setSelectedAddressIndex(null);
    setUsername("");
    setAddress1("");
    setAddress2("");
    setZipCode("");
    setPhoneNumber("");
    setAltPhoneNumber("");
    setLandMark("");
    setCity("");
    setUserInfo(false);
    setLastUsedAddress(null); // Reset the last used address
  };

  const isDisabled = selectedAddressIndex !== null || lastUsedAddress !== null;

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">

      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={username}
              disabled={isDisabled}
              onChange={(e) => setUsername(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Phone number</label>
            <input
              type="number"
              value={phoneNumber}
              disabled={isDisabled}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>


        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">House No.,Building Name</label>
            <input
              type="address"
              value={address1}
              disabled={isDisabled}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Road name, Area, Colony</label>
            <input
              type="address"
              value={address2}
              disabled={isDisabled}
              onChange={(e) => setAddress2(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Add Newarby LandMark</label>
            <input
              type="address"
              value={landmark}
              disabled={isDisabled}
              onChange={(e) => setLandMark(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Alternate Phone number</label>
            <input
              type="number"
              value={altphoneNumber}
              disabled={isDisabled}
              onChange={(e) => setAltPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <input
              type="text"
              value={city}
              disabled={isDisabled}
              onChange={(e) => setCity(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Pincode</label>
            <input
              type="number"
              value={zipCode}
              disabled={isDisabled}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>
      </form>
      <div>
        <button
          className="px-4 py-2 mt-3 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleChooseSavedAddressClick}
        >
          Choose from saved address
        </button>

        {userInfo && (
          <div>
            {user && user.addresses.map((item, index) => (
              <div className="w-full bg-white rounded-lg shadow mb-5 p-3 relative flex flex-col"
                key={index}
                onClick={() => handleSavedAddressClick(index, item)}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    value={index}
                    checked={selectedAddressIndex === index}
                    onChange={() => handleSavedAddressClick(index, item)}
                  />
                  <h5 className="pl-2 font-semibold">{item.userName}</h5>
                  <p className="pl-2 mt-1 mb-1">{item.phoneNumber}</p>
                  <p className="ml-2 p-1 pt-0 pb-0 mt-1 mb-1 font-thin bg-slate-200 border rounded-md">{item.addressType}</p>
                </div>
                <div className="flex flex-col pl-6">
                  {/* <p className="mb-1">{item.userName}</p> */}
                  <p className="mb-1">{item.address1}</p>
                  <p className="mb-1"> {item.address2}</p>
                  {/* <p className="mb-1">{item.phoneNumber}</p> */}
                  {/* <p className="mb-1">{item.altphoneNumber}</p> */}
                  {/* <p className="mb-1">{item.landmark}</p> */}
                  <div className="flex">
                    <p className="mb-1">{item.city}</p>
                    <p className="mb-1 ml-1"> {item.zipCode}</p>
                  </div>
                </div>
              </div>
            ))}
            {user && user.addresses.length === 0 && (
              <h5 className="text-center pt-8 text-[18px]">
                You do not have any saved address!
              </h5>
            )}
          </div>
        )}

        <div className="w-full flex mt-1">
          <button
            className="px-4 py-2 mt-3 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddNewAddressClick}
          >
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h5 className="text-[18px] font-[500]">Cart Total</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h5 className="text-[16px] font-[400]">Subtotal:</h5>
        <h5 className="text-[16px] font-[400]">₹{subTotalPrice}</h5>
      </div>
      <div className="flex justify-between">
        <h5 className="text-[16px] font-[400]">Shipping:</h5>
        <h5 className="text-[16px] font-[400]">₹{shipping.toFixed(2)}</h5>
      </div>
      <div className="flex justify-between border-b pb-3">
        <h5 className="text-[16px] font-[400]">Discount:</h5>
        <h5 className="text-[16px] font-[400]">
          {discountPercentenge ? "₹" + discountPercentenge.toFixed(2) : null}
        </h5>
      </div>
      <div className="flex justify-between pt-3">
        <h5 className="text-[18px] font-[600]">Total:</h5>
        <h5 className="text-[18px] font-[600]">₹{totalPrice}</h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} w-full h-[40px] pl-2`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full bg-[#3BB77E] h-[40px] flex items-center justify-center text-white rounded-[5px] mt-8 cursor-pointer`}
        >
          Apply Code
        </button>
      </form>
    </div>
  );
};

export default Checkout;