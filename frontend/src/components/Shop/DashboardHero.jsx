import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";import { RxCross1 } from "react-icons/rx";
import { server } from "../../server";
import axios from "axios";

import { getAllProductsShop } from "../../redux/actions/product";
import {  updateNewStockNotification } from "../../redux/actions/sellers";
import {  updateShopStatus } from "../../redux/actions/sellers";

import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const DashboardHero = () => {
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const [kuchvi, setkuchvi] = useState([]);
  const [row, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [opn, setOpn] = useState(false);

  const navigate = useNavigate();

  // const seller=id;
  console.log("seller",seller.notification)





  useEffect(() => {
    axios
      .get(`${server}/kuchvi/get-all-admin-kuchvi-request`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("jklllllllllll",res.data)
      
        setkuchvi(res.data.allKuchviRequest);
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false); 
      });
      
  }, []);
  useEffect(() => {
    if (!loading) {
      const updateRows = () => {
        const newRows = kuchvi.filter(val => val.shopId === seller._id).map((val, ind) => ({
          id: ind, // Ensure the unique ID for DataGrid is unique
          orderid: val.orderId,
          productid: val.productId,
          size: val.size,
          image: val.img,
          itemsQty: 1,
          total: "₹" + val.shopPrice,
          status: val.status,
          address: val.shippingAddress,
          userId: val.userId,
          shopId: val.shopId,
          delivered: val.delivered,
          cancel: val.cancel,
          refundStatus: val.refundStatus,
          user:val.user,
          paymentInfo:val.paymentInfo,
          productName:val.productName,
          product:val.product,
          markedPrice: val.markedPrice,
          discountPrice: val.discountPrice,
          shopPrice: val.shopPrice,
          kuchviId: val.kuchviId,
          return1: val.return1,
          refund:val.refund,
          reundStatus:val.refundStatus,
          deliveredAt:val.deliveredAt,
          returnedAt:val.returnedAt,
          createdAt:val.createdAt
        }));
        setRows(newRows);
      };

      updateRows();
    }
  }, [kuchvi, seller._id, loading]);

  // const data = rows.find((item) => item.kuchviId === id);
  // console.log("Data:", data);
  console.log("Data:", row);

  // console.log("Id",products)

  const [showNewStock, setShowNewStock] = useState(seller.notification); // Initialize showNewStock with false
  const [showShopStatus, setShowShopStatus] = useState(seller.shopIsActive); // Initialize showNewStock with false

  // Ensure that shopId and newShopStatus are correctly passed to updateNewStockNotification
  const handleStockNotification = async () => {
    try {
      const newStockValue = !showNewStock; // Toggle the new stock value
      setShowNewStock(newStockValue); // Update the local state if the backend update is successful
      // Make a request to update the new stock notification in the backend
      window.location.reload();

      const response = await dispatch(updateNewStockNotification(seller._id, newStockValue));


    } catch (error) {
      console.error(`Error updating new stock notification:`, error);
    }
  };
  

   // Ensure that shopId and newStockValue are correctly passed to updateNewStockNotification
   const handleShopStatus = async () => {
    try {
      const newShopStatus = !showShopStatus; // Toggle the new stock value
      setShowShopStatus(newShopStatus); // Update the local state if the backend update is successful
      // Make a request to update the new stock notification in the backend
      window.location.reload();

      const response = await dispatch(updateShopStatus(seller._id, newShopStatus));


    } catch (error) {
      console.error(`Error updating new stock notification:`, error);
    }
  };




  useEffect(() => {
    dispatch(getAllOrdersOfShop(id));
    dispatch(getAllProductsShop(id));
  }, [dispatch, id]); // Include id in the dependency array
  


  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
 }, [dispatch]);
  const availableBalance = seller?.availableBalance.toFixed(2);

  
  const columns = [
    // { field: "kuchviId", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "image",
      headerName: "Image",
      minWidth: 100,
      flex: 0.7,
      // renderCell: (params) => <img src={params.row.image} alt="Product" />,

      renderCell: (params) => (
        <img
          src={params.row.image}
          alt="Product"
          style={{ height: "40px", width: "40px" }}
        />
      )
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // Console log the params to see its contents
        console.log("params",params);
    
        return (
          <>
            <Link to={`/order/${params?.row?.kuchviId}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    }
    
  ];
  
  const handleRowClick = (params) => {
    navigate(`/order/${params.row.kuchviId}`);
  };
  

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="flex m-1 p-1 space-x-2">
      <button
        className={`py-2 px-4 rounded ${
          showNewStock ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
        onClick={() =>setOpn(true)}
      >
        {showNewStock ? "No New Stock" : "New Stock Available"}
      </button>
      {opn && (
            <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
              <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpn(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                  {showNewStock ? "No New Stock Available" : "Any New Stock Available?"}
                </h3>
                <div className="w-full flex items-center justify-center">
                  <div
                    className={`${styles.button} !bg-red-500 text-white text-[18px] !h-[42px] mr-4`}
                    onClick={() => setOpn(false)}
                  >
                    No
                  </div>
                  <div
                    className={`${styles.button} !bg-red-500 text-white text-[18px] !h-[42px] ml-4`}
                    onClick={() => {
                      setOpn(false);
                      handleStockNotification();
                    }}
                  >
                    Yes
                  </div>
                </div>
              </div>
            </div>
          )}
      <button
        className={`py-2 px-4 rounded ${
          showShopStatus ? "bg-blue-500 text-white" : "bg-red-500 text-white"
        }`}
        onClick={() =>setOpen(true)}
        >
          {showShopStatus ? "Open Your Shop" : "Close Your Shop"}
        </button>
        {open && (
            <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
              <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                  {showShopStatus ? "Are you sure you want to close your shop?" : "Are you sure you want to open your shop?"}
                </h3>
                <div className="w-full flex items-center justify-center">
                  <div
                    className={`${styles.button} !bg-red-500 text-white text-[18px] !h-[42px] mr-4`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !bg-red-500 text-white text-[18px] !h-[42px] ml-4`}
                    onClick={() => {
                      setOpen(false);
                      handleShopStatus();
                    }}
                  >
                    Confirm
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <br></br>
        <div className="w-full block 800px:flex items-center justify-between">
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                Account Balance{" "}
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">₹{availableBalance}</h5>          
            <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Total Income</h5>
            </Link>
          </div>
  
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{row && row.length}</h5>
            <Link to="/dashboard-orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
  
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Products
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
            <Link to="/dashboard-products">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
            </Link>
          </div>
        </div>
        <br />
        <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    );
  };
  
  export default DashboardHero;