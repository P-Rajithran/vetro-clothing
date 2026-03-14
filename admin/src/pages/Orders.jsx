import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error fetching orders')
      console.error(error)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        toast.success('Status updated!')
        fetchOrders()
      }
    } catch (error) {
      toast.error('Error updating status')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  return (
    <div className='px-4 sm:px-8 py-6'>
      <h2 className='text-2xl font-semibold mb-6'>All Orders</h2>
      {orders.length === 0 && (
        <p className='text-gray-400 text-center py-10'>No orders found.</p>
      )}
      <div className='flex flex-col gap-4'>
        {orders.map((order) => (
          <div key={order._id} className='border rounded p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4'>

            {/* Order Items */}
            <div className='flex-1'>
              <p className='text-xs text-gray-400 mb-2'>Order ID: {order._id}</p>
              {order.items.map((item, i) => (
                <div key={i} className='flex items-center gap-3 mb-2'>
                  <img src={item.image?.[0] || '/placeholder.png'} alt={item.name} className='w-12 h-12 object-cover rounded' />
                  <div>
                    <p className='text-sm font-medium'>{item.name}</p>
                    <p className='text-xs text-gray-500'>Size: {item.size} | Qty: {item.quantity} | {currency}{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className='flex-1 text-sm text-gray-600'>
              <p className='font-medium text-black mb-1'>{order.address?.firstName} {order.address?.lastName}</p>
              <p>{order.address?.street}</p>
              <p>{order.address?.city}, {order.address?.state} - {order.address?.zipcode}</p>
              <p>{order.address?.country}</p>
              <p className='mt-1'>📞 {order.address?.phone}</p>
            </div>

            {/* Order Info */}
            <div className='flex-1 text-sm'>
              <p><span className='font-medium'>Items:</span> {order.items.length}</p>
              <p><span className='font-medium'>Amount:</span> {currency}{order.amount}</p>
              <p><span className='font-medium'>Method:</span> {order.paymentMethod}</p>
              <p><span className='font-medium'>Payment:</span> {order.payment ? '✅ Done' : '⏳ Pending'}</p>
              <p><span className='font-medium'>Date:</span> {new Date(order.date).toDateString()}</p>
            </div>

            {/* Status */}
            <div className='min-w-[160px]'>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className='border rounded px-3 py-1.5 text-sm font-medium cursor-pointer w-full'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders