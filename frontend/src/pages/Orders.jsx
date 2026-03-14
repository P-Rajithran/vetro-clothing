import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { loadOrderData(); }, [token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#C9A84C';
      case 'processing': return '#2196F3';
      case 'out for delivery': return '#FF9800';
      default: return '#6B7B6B';
    }
  }

  return (
    <div className='pt-16' style={{ borderTop: '1px solid #C9A84C30' }}>

      {/* Header */}
      <div className='text-center mb-12'>
        <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>HISTORY</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#1A2E1A', fontWeight: '400' }}>
          My Orders
        </h1>
        <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
      </div>

      {/* Orders List */}
      {orderData.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-xs tracking-widest' style={{ color: '#6B7B6B' }}>NO ORDERS YET</p>
        </div>
      ) : (
        <div className='flex flex-col gap-6'>
          {orderData.map((order, index) => (
            order.items.map((item, i) => (
              <div
                key={`${index}-${i}`}
                className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6'
                style={{ border: '1px solid #C9A84C20', background: '#FAFAF8' }}
              >
                {/* Product */}
                <div className='flex items-center gap-6'>
                  <div className='overflow-hidden flex-shrink-0' style={{ width: '80px', height: '100px', background: '#F0EDE6' }}>
                    <img
                      className='w-full h-full object-cover'
                      src={item.image?.[0] || '/placeholder.png'}
                      alt={item.name}
                      onError={(e) => { e.target.src = '/placeholder.png' }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#1A2E1A', fontWeight: '400' }}>
                      {item.name}
                    </p>
                    <div className='flex items-center gap-4 mt-2'>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', color: '#C9A84C' }}>
                        {currency}{item.price}
                      </p>
                      <p className='text-xs px-3 py-1' style={{ border: '1px solid #C9A84C40', color: '#6B7B6B' }}>
                        {item.size}
                      </p>
                      <p className='text-xs' style={{ color: '#6B7B6B' }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className='flex gap-4 mt-2'>
                      <p className='text-xs' style={{ color: '#6B7B6B' }}>
                        {new Date(order.date).toDateString()}
                      </p>
                      <p className='text-xs uppercase' style={{ color: '#6B7B6B' }}>
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Action */}
                <div className='flex items-center justify-between md:justify-end gap-6'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full' style={{ background: getStatusColor(order.status) }} />
                    <p className='text-xs tracking-widest' style={{ color: getStatusColor(order.status) }}>
                      {order.status?.toUpperCase() || 'ORDER PLACED'}
                    </p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className='text-xs tracking-widest transition-all duration-300'
                    style={{
                      border: '1px solid #1A2E1A',
                      color: '#1A2E1A',
                      padding: '10px 24px',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '2px'
                    }}
                    onMouseEnter={e => { e.target.style.background = '#1A2E1A'; e.target.style.color = '#C9A84C'; }}
                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#1A2E1A'; }}
                  >
                    TRACK
                  </button>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;