import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
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

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(product => product._id === item._id);
          if (!productData) return null;

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={(function(){const raw=(productData.image && productData.image[0])||'/placeholder.png'; if(!raw.startsWith('http') && raw !== '/placeholder.png'){const backendUrl=import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'; return `${backendUrl}${raw.startsWith('/') ? '' : '/'}${raw}`;} return raw; })()} alt={productData.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                className='border max-w-20 px-1 sm:px-2 py-1'
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1) updateQuantity(item._id, item.size, value);
                }}
              />
              <img
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt="Remove from cart"
                onClick={() => removeFromCart(item._id, item.size)}
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-normal my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;