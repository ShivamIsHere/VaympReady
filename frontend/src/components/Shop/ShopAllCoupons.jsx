import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopAllCoupons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Failed to load coupons");
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Coupon code deleted successfully!");
        setCoupouns(coupouns.filter((coupon) => coupon._id !== id)); // Update state without reloading
      })
      .catch((error) => {
        toast.error("Failed to delete coupon");
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "percentage",
      headerName: "Discount %",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "totalUsed",
      headerName: "Total Used",
      minWidth: 100,
      flex: 0.6,
    },
  ];

  const rows = coupouns.map((item) => ({
    id: item._id,
    name: item.name,
    percentage: item.percentage + " %",
    totalUsed: item.totalUsed,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      )}
    </>
  );
};

export default ShopAllCoupons;
