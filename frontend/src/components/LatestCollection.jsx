import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Step into style with our newest arrivals — handpicked for trendsetters who refuse to settle for ordinary. Unleash your bold side, elevate your look, and redefine what it means to wear confidence. This is more than fashion — this is your moment.
        </p>

        {/* Visible debug info */}
        <div className='mt-3 text-sm text-gray-500'>
          <strong>Products available:</strong> {products?.length || 0} • <a className='underline' href='/debug/products' target='_blank' rel='noreferrer'>View raw data</a>
        </div>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 [&>*]:aspect-square'>
        {latestProducts.length ? latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        )) : (
          <div className='col-span-full text-center py-12 text-gray-400'>
            No products to display. If you expected products, open <a className='underline' href='/debug/products' target='_blank' rel='noreferrer'>server debug page</a> to confirm backend data or check the browser console for errors.
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
