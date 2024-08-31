import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails";
import AdminOrderDetailPage from '../components/Shop/AdminOrderDetailPage';

const AdminOrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <AdminOrderDetailPage />
        {/* <Footer /> */}
    </div>
  )
}

export default AdminOrderDetailsPage