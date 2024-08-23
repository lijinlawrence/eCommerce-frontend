import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='flex justify-center items-center flex-col h-screen'>
        <img src="/images/completeOrder.png" alt="" />
        <p className='font-bold text-2xl'>Your Order has been placed succesfully...</p>
        <Link to={'/myOrders'} className='text-blue-400 mt-5 text-xl' >Go to Orders</Link>

    </div>
  )
}

export default OrderSuccess