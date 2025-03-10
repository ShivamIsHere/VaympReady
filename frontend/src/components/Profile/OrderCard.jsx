import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineRight } from "react-icons/ai";

const OrderCard = ({ order }) => {
  const {
    id,
    image,
    productName,
    status,
    total,
    size,
    discountPrice,
    kuchviId
  } = order;
  return (
    <Link to={`/user/order/${kuchviId}`} >
      <div className="bg-white ml-2 p-4 rounded shadow flex items-start gap-4">
        <div className="flex items-start flex-grow">
          {image && (
            <div className="flex-none w-34">
              <img src={image} alt={productName} className="w-[70px] h-[90px] object-contain rounded" />
            </div>
          )}
          <div className="flex flex-col justify-between flex-grow ml-4">
            <div className="mb-2 md:hidden">
              <Link to={`/user/order/${kuchviId}`}className="hover:text-blue-500">
                {productName.length > 20 ? productName.slice(0, 10) + "..." : productName}
              </Link>
            </div>
            <div className="mb-2 hidden md:block">
              <Link to={`/user/order/${kuchviId}`}className="hover:text-blue-500">
                {productName}
              </Link>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              Status:{" "}
              <span className={`font-medium ${
                status === "Cancelled" || status === "Cancel Request"
                  ? "text-red-500"
                  : status === "Returned" || status === "Return Request"
                  ? "text-orange-400"
                  : "text-green-500"
              }`}>
                {status === "Cancel Request" ? "Cancelled" : status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-1">Price: <span className="font-medium text-black">₹{discountPrice}</span></div>
            <div className="text-sm text-gray-600">Size: <span className="font-medium text-black">{size}</span></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row-reverse items-center mt-6">
          <Link to={`/user/order/${kuchviId}`} >
            <Button 
              variant="contained" 
              style={{ 
                backgroundColor: 'transparent', 
                color: 'inherit', 
                boxShadow: 'none' 
              }}
              endIcon={<AiOutlineRight />}
            >
            </Button>
          </Link>
        </div>
      </div>
    </Link>
  );
};  

export default OrderCard;
