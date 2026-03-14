import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const getImageUrl = () => {
    let imageUrl = null;
    if (Array.isArray(image) && image.length > 0 && image[0]) {
      imageUrl = image[0];
    } else if (typeof image === 'string' && image) {
      imageUrl = image;
    }
    if (!imageUrl) return '/placeholder.png';
    if (imageUrl.startsWith('http')) return imageUrl;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    return `${backendUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const imgSrc = getImageUrl();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder.png';
  };

  return (
    <Link className='cursor-pointer group product-card block' to={`/product/${id}`}>
      {/* Image Container */}
      <div className='overflow-hidden relative' style={{ aspectRatio: '3/4', background: '#F0EDE6' }}>
        <img
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          src={imgSrc}
          alt={name}
          onError={handleImageError}
          loading="lazy"
        />
        {/* Gold overlay on hover */}
        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4'
          style={{ background: 'linear-gradient(to top, rgba(26,46,26,0.6) 0%, transparent 60%)' }}>
          <span className='text-xs tracking-widest font-light' style={{ color: '#C9A84C' }}>VIEW DETAILS</span>
        </div>
      </div>

      {/* Product Info */}
      <div className='pt-3 pb-1'>
        <p className='text-xs tracking-wide font-light leading-5 truncate' style={{ color: '#1A2E1A', fontFamily: 'Montserrat, sans-serif' }}>{name}</p>
        <div className='flex items-center justify-between mt-1'>
          <p className='text-sm font-medium' style={{ color: '#C9A84C', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}>
            {currency}{price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
