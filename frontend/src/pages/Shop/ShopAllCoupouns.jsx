import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllCoupons from "../../components/Shop/AllCoupons";
import ShopAllCoupons from '../../components/Shop/ShopAllCoupons';

const ShopAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={9} />
            </div>
            <div className="w-full justify-center flex">
                {/* <AllCoupons /> */}
                <ShopAllCoupons/>
            </div>
          </div>
    </div>
  )
}

export default ShopAllCoupouns