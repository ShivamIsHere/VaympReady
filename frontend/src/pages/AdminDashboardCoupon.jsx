import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllCoupon from "../components/Admin/AllCoupon";

const AdminDashboardCoupon = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={12} />
        </div>
         <AllCoupon />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardCoupon