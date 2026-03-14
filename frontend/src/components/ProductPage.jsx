import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductPage = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const productData = products.find((item) => item.id === productId);
  
  if (!productData) return <div>Product not found</div>;

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder.png';
    if (imageUrl.startsWith('http')) return imageUrl;
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    return `${backendUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const initialImage = productData?.image?.[0] ? getImageUrl(productData.image[0]) : '/placeholder.png';
  const [image, setImage] = useState(initialImage);

  const [size, setSize] = useState('');

  return (
    <div className='p-4'>
      <div className='flex flex-col sm:flex-row gap-10'>
        <div className='w-full sm:w-1/2'>
          <img 
            src={image} 
            alt={productData.name}
            className='w-full'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            }}
          />
          <div className='flex gap-2 mt-4 overflow-x-auto'>
            {productData.image && productData.image.length > 0 && productData.image.map((img, index) => {
              const imgUrl = getImageUrl(img);
              return (
                <img
                  key={index}
                  onClick={() => setImage(imgUrl)}
                  src={imgUrl}
                  alt={`${productData.name}-${index}`}
                  className='w-20 h-20 object-cover cursor-pointer border hover:border-orange-500'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className='w-full sm:w-1/2'>
          <h1 className='text-2xl font-semibold'>{productData.name}</h1>
          <p className='text-gray-500 mt-2'>{productData.description}</p>
          <p className='text-2xl font-bold mt-4'>{currency}{productData.price}</p>

          <div className='mt-6'>
            <p>Select Size:</p>
            <div className='flex gap-2 mt-2'>
              {productData.sizes?.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border ${size === s ? 'border-orange-500' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => size ? addToCart(productData._id, size) : alert('Please select a size')}
            className='mt-6 px-6 py-3 bg-black text-white'
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
