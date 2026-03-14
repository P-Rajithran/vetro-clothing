import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.keys(cartItems).flatMap(itemId =>
        Object.keys(cartItems[itemId]).map(size => ({
          _id: itemId,
          size,
          quantity: cartItems[itemId][size]
        }))
      );
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const getImgUrl = (raw) => {
    if (!raw) return '/placeholder.png';
    if (raw.startsWith('http')) return raw;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    return `${backendUrl}${raw.startsWith('/') ? '' : '/'}${raw}`;
  }

  return (
    <div className='pt-14' style={{ borderTop: '1px solid #C9A84C30' }}>

      {/* Header */}
      <div className='text-center mb-12'>
        <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C' }}>REVIEW</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#1A2E1A', fontWeight: '400' }}>
          Your Cart
        </h1>
        <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
      </div>

      {/* Cart Items */}
      {cartData.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-xs tracking-widest mb-6' style={{ color: '#6B7B6B' }}>YOUR CART IS EMPTY</p>
          <button
            onClick={() => navigate('/collection')}
            className='text-xs tracking-widest'
            style={{ background: '#1A2E1A', color: '#C9A84C', padding: '14px 32px', border: 'none', cursor: 'pointer', letterSpacing: '3px' }}
          >
            EXPLORE COLLECTION
          </button>
        </div>
      ) : (
        <div>
          {/* Column Headers */}
          <div className='hidden sm:grid grid-cols-[3fr_1fr_1fr_0.5fr] gap-4 mb-4 pb-4 text-xs tracking-widest'
            style={{ borderBottom: '1px solid #C9A84C30', color: '#6B7B6B' }}>
            <p>PRODUCT</p>
            <p>PRICE</p>
            <p>QUANTITY</p>
            <p>REMOVE</p>
          </div>

          {cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id);
            if (!productData) return null;

            return (
              <div key={index} className='grid grid-cols-[3fr_1fr_1fr_0.5fr] gap-4 py-6 items-center'
                style={{ borderBottom: '1px solid #C9A84C20' }}>

                {/* Product */}
                <div className='flex items-center gap-5'>
                  <div className='overflow-hidden flex-shrink-0' style={{ width: '80px', height: '100px', background: '#F0EDE6' }}>
                    <img
                      className='w-full h-full object-cover'
                      src={getImgUrl(productData.image?.[0])}
                      alt={productData.name}
                    />
                  </div>
                  <div>
                    <p className='text-sm font-light' style={{ color: '#1A2E1A', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}>
                      {productData.name}
                    </p>
                    <p className='text-xs tracking-widest mt-2 px-3 py-1 inline-block'
                      style={{ border: '1px solid #C9A84C40', color: '#6B7B6B' }}>
                      {item.size}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#C9A84C' }}>
                  {currency}{productData.price}
                </p>

                {/* Quantity */}
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                    className='w-8 h-8 flex items-center justify-center text-sm transition-all'
                    style={{ border: '1px solid #C9A84C40', color: '#1A2E1A', cursor: 'pointer', background: 'transparent' }}
                  >−</button>
                  <span className='w-8 text-center text-sm' style={{ color: '#1A2E1A' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className='w-8 h-8 flex items-center justify-center text-sm transition-all'
                    style={{ border: '1px solid #C9A84C40', color: '#1A2E1A', cursor: 'pointer', background: 'transparent' }}
                  >+</button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id, item.size)}
                  className='flex items-center justify-center transition-opacity hover:opacity-50'
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <img className='w-4' src={assets.bin_icon} alt="Remove" />
                </button>
              </div>
            );
          })}

          {/* Cart Total */}
          <div className='flex justify-end mt-16 mb-20'>
            <div className='w-full sm:w-[420px]'>
              <CartTotal />
              <button
                onClick={() => navigate('/place-order')}
                className='w-full mt-6 text-xs tracking-widest transition-all duration-300'
                style={{
                  background: '#1A2E1A',
                  color: '#C9A84C',
                  border: '1px solid #1A2E1A',
                  padding: '16px 48px',
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer',
                  letterSpacing: '3px'
                }}
                onMouseEnter={e => { e.target.style.background = '#C9A84C'; e.target.style.color = '#1A2E1A'; }}
                onMouseLeave={e => { e.target.style.background = '#1A2E1A'; e.target.style.color = '#C9A84C'; }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;