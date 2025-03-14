import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineGift, AiOutlineFileAdd, AiOutlineEye } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [loading, setLoading] = useState(true); // Loading state
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true); // Show loader when data starts fetching
      await dispatch(getAllSellers());
      setLoading(false); // Hide loader once data is fetched
    };
    fetchSellers();
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellers());
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 80, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "JoinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Preview Shop",
      flex: 1,
      minWidth: 150,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
          <Link to={`/admin/shop/preview/${params.id}`}>
          <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
          </>
        );
      },
    },
    {
        field: "  ",
        flex: 1,
        minWidth: 150,
        headerName: "Create Product",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
            <Link to={`/dashboard-create-product/${params.id}`}>
            <Button >
            <AiOutlineFileAdd size={20} />
              </Button>
            </Link>
            </>
          );
        },
      },
      {
        field: "",
        flex: 1,
        minWidth: 150,
        headerName: "Create Event",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/dashboard-create-event/${params.id}`}>
                <Button>
                  <MdOutlineLocalOffer  size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
      {
        field: "mmm",
        flex: 1,
        minWidth: 150,
        headerName: "Upload photo",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/dashboard-upload-photo/${params.id}`}>
                <Button>
                  <MdOutlineLocalOffer  size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
      {
        field: "kk",
        flex: 1,
        minWidth: 150,
        headerName: "Create Coupon",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/dashboard-create-coupan/${params.id}`}>
                <Button>
                  <AiOutlineGift  size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
    
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        address: item.address,
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>

        {/* Show loader when loading is true */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[45vh]">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        )}

        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;