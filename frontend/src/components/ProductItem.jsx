import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Handle image - either from array or single value
  const getImageUrl = () => {
    let imageUrl = null;
    
    // Extract first image from array or use direct value
    if (Array.isArray(image) && image.length > 0 && image[0]) {
      imageUrl = image[0];
    } else if (typeof image === 'string' && image) {
      imageUrl = image;
    }
    
    // Validate URL - use placeholder if missing or invalid
    if (!imageUrl) {
      return '/placeholder.png';
    }
    
    // If it's already a full URL (http/https), use it directly
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // For relative paths, construct backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    return `${backendUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const imgSrc = getImageUrl();

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/placeholder.png';
  };

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden w-full h-full'>
        <img 
          className='w-full h-full object-cover hover:scale-110 transition ease-in-out' 
          src={imgSrc} 
          alt={name} 
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
