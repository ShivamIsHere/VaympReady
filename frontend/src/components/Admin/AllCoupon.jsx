import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const AllCoupon = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/coupon/get-all-coupon-admin`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.couponCodes);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Error fetching coupons");
      });
  }, []);
console.log("1111111111",data)
  const columns = [
    { field: "id", headerName: "Coupon ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop ID",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "percentage",
      headerName: "Discount%",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "totalUsed",
      headerName: "Total Used",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 130,
      flex: 0.6,
    },
  ];

  const rows = data.map((item) => ({
    id: item._id,
    shopId: item.shopId,
    name: item.name,
    percentage: item.percentage,
    totalUsed: item.totalUsed,
    createdAt: item.createdAt.slice(0, 10),
  }));

  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default AllCoupon;
