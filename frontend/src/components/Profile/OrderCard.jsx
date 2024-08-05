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
    <Link to={`/user/order/${kuchviId}`} className="block hover:shadow-lg transition-shadow duration-300">
      <div className="bg-white p-6 rounded-lg shadow flex items-start gap-4">
        <div className="flex items-start flex-grow">
          {image && (
            <div className="flex-none w-[70px]">
              <img src={image} alt={productName} className="w-full h-full object-contain rounded-md" />
            </div>
          )}
          <div className="flex flex-col justify-between flex-grow ml-4">
            <div className="mb-2 w-full">
              <Link to={`/user/order/${kuchviId}`} className="hover:text-blue-500 block truncate text-lg font-semibold max-w-full">
                {productName}
              </Link>
            </div>
            <div className="text-sm text-gray-600 mb-1">Status: <span className={`font-medium ${status === "cancel Request" ? "text-red-500" : "text-green-500"}`}>{status === "cancel Request" ? "Cancelled" : status}</span></div>
            <div className="text-sm text-gray-600 mb-1">Price: <span className="font-medium text-black">₹{discountPrice}</span></div>
            <div className="text-sm text-gray-600">Size: <span className="font-medium text-black">{size}</span></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row-reverse items-center mt-6">
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
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
