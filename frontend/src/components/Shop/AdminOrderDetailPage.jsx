import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { server } from "../../server";
import axios from "axios";
import { Oval } from 'react-loader-spinner';

const AdminOrderDetailPage = () => {
  const { user } = useSelector((state) => state.user);
  const [kuchvi, setKuchvi] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${server}/kuchvi/get-all-admin-kuchvi-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setKuchvi(res.data.allKuchviRequest);
        setLoading(false); 
      })
      .catch((error) => {
        console.error(error.response);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const updateRows = () => {
        const newRows = kuchvi.map((val, ind) => ({
          id: ind,
          orderid: val.orderId,
          productid: val.productId,
          size: val.size,
          image: val.img,
          itemsQty: 1,
          total: "₹" + val.markedPrice,
          status: val.status,
          user: val.user,
          paymentInfo: val.paymentInfo,
          address: val.shippingAddress,
          userId: val.userId,
          shopId: val.shopId,
          delivered: val.delivered,
          cancel: val.cancel,
          markedPrice: val.markedPrice,
          productName: val.productName,
          product: val.product,
          discountPrice: val.discountPrice,
          shopPrice: val.shopPrice,
          kuchviId: val.kuchviId,
          return1: val.return1,
          refund: val.refund,
          refundStatus: val.refundStatus,
          deliveredAt: val.deliveredAt,
          returnedAt: val.returnedAt,
          createdAt: val.createdAt,
        }));
        setRows(newRows);
      };
      updateRows();
    }
  }, [kuchvi, loading]);

  const data = rows.find((item) => item.kuchviId === id);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Oval color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (!data) {
    return <div>No data found for this order.</div>;
  }

  const handleProductClick = () => {
    navigate(`/product/${data.productid}`);
    window.location.reload();
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section} bg-gray-100`}>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-3 text-[25px] font-bold text-gray-800">Order Details</h1>
          </div>
          <Link to="/dashboard-orders">
            <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
              Order List
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between text-gray-600 mb-6">
          <h5>
            Order ID: <span className="font-semibold text-gray-800">#{data.kuchviId?.slice(16, 24)}</span>
          </h5>
          <h5>
            Placed on: <span className="font-semibold text-gray-800">{data.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>

        <div className="flex flex-col sm:flex-row items-start mb-6">
          <img
            src={data.image}
            alt="Product"
            className="w-[80px] h-[80px] sm:w-[110px] sm:h-[150px] object-contain cursor-pointer mb-3 sm:mb-0"
            onClick={handleProductClick}
          />
          <div className="pl-3">
            <h5 className="text-[20px] font-semibold">{data.productName}</h5>
            <h5 className="text-[18px] text-gray-700">{data.size} x {data.itemsQty}</h5>
          </div>
        </div>

        <div className="border-t pt-4 text-right">
          <h5 className="text-[18px] text-gray-600">
            Total Price: <strong className="text-gray-800">{data.total}</strong>
          </h5>
          <h5 className="text-[18px] text-gray-600">
            Discounted Price: <strong className="text-gray-800">{data.discountPrice}</strong>
          </h5>
          <h5 className="text-[18px] text-gray-600">
            Shop Price: <strong className="text-gray-800">{data.shopPrice}</strong>
          </h5>
        </div>

        <div className="flex flex-col sm:flex-row mt-6">
          <div className="w-full sm:w-[60%]">
            <h4 className="text-[20px] font-semibold">Shipping Address</h4>
            <p className="text-[18px] text-gray-700">Name:-{data.user.name}</p>
            <p className="mt-2 text-[18px] text-gray-700">Address:-{`${data.address.address1}, ${data.address.address2}`}</p>
            <p className="text-[18px] text-gray-700">Name:-{data.user.name}</p>
            <p className="text-[18px] text-gray-700">City:-{data.address.city}</p>
            <p className="text-[18px] text-gray-700">Landmark: {data.address.landmark}</p>
            <p className="text-[18px] text-gray-700">Phone: {data.address.phoneNumber}</p>
            {data.address.altphoneNumber && (
              <p className="text-[18px] text-gray-700">Alt Phone: {data.address.altphoneNumber}</p>
            )}
          </div>
          <div className="w-full sm:w-[40%] mt-6 sm:mt-0">
            <h4 className="text-[20px] font-semibold">Payment Info</h4>
            <p className="mt-2 text-[18px] text-gray-700">Status: {data.status ? data.status : "Not Paid"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
