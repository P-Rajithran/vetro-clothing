import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  const getImgUrl = (raw) => {
    if (!raw) return '/placeholder.png';
    if (raw.startsWith('http')) return raw;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    return `${backendUrl}${raw.startsWith('/') ? '' : '/'}${raw}`;
  }

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  }

  useEffect(() => { fetchProductData(); }, [productId, products]);

  return productData ? (
    <div className='pt-10' style={{ borderTop: '1px solid #C9A84C30' }}>

      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full gap-2'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={getImgUrl(item)}
                key={index}
                className='w-[23%] sm:w-full sm:mb-2 flex-shrink-0 cursor-pointer object-cover'
                style={{
                  aspectRatio: '1',
                  border: image === item ? '1px solid #C9A84C' : '1px solid transparent',
                  opacity: image === item ? 1 : 0.6,
                  transition: 'all 0.3s ease'
                }}
                alt="Thumbnail"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='w-full sm:w-[80%] overflow-hidden' style={{ background: '#F0EDE6' }}>
            <img
              className='w-full h-full object-cover transition-all duration-500'
              style={{ maxHeight: '600px', objectFit: 'cover' }}
              src={getImgUrl(image)}
              alt="Product"
              onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png' }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 py-2'>
          {/* Category badge */}
          <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>
            {productData.category?.toUpperCase()} · {productData.subCategory?.toUpperCase()}
          </p>

          {/* Name */}
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: '400', color: '#1A2E1A', lineHeight: '1.2' }}>
            {productData.name}
          </h1>

          {/* Rating */}
          <div className='flex items-center gap-1 mt-3'>
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={assets.star_icon} alt="" className="w-3" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className='text-xs ml-2' style={{ color: '#6B7B6B' }}>(122 reviews)</p>
          </div>

          {/* Gold divider */}
          <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '20px 0' }} />

          {/* Price */}
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#C9A84C', fontWeight: '400' }}>
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className='mt-4 text-sm font-light leading-relaxed' style={{ color: '#6B7B6B', fontFamily: 'Montserrat, sans-serif' }}>
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className='mt-8'>
            <p className='text-xs tracking-widest mb-4' style={{ color: '#1A2E1A', fontFamily: 'Montserrat, sans-serif' }}>
              SELECT SIZE
            </p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className='text-xs tracking-widest transition-all duration-300'
                  style={{
                    padding: '10px 20px',
                    border: item === size ? '1px solid #1A2E1A' : '1px solid #C9A84C40',
                    background: item === size ? '#1A2E1A' : 'transparent',
                    color: item === size ? '#C9A84C' : '#1A2E1A',
                    fontFamily: 'Montserrat, sans-serif',
                    cursor: 'pointer'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => size ? addToCart(productData._id, size) : alert("Please select a size!")}
            className='mt-8 w-full sm:w-auto text-xs tracking-widest transition-all duration-300'
            style={{
              background: '#1A2E1A',
              color: '#C9A84C',
              border: '1px solid #1A2E1A',
              padding: '16px 48px',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              letterSpacing: '3px'
            }}
            onMouseEnter={e => { e.target.style.background = '#C9A84C'; e.target.style.color = '#1A2E1A'; e.target.style.borderColor = '#C9A84C'; }}
            onMouseLeave={e => { e.target.style.background = '#1A2E1A'; e.target.style.color = '#C9A84C'; e.target.style.borderColor = '#1A2E1A'; }}
          >
            ADD TO CART
          </button>

          {/* Policy */}
          <div className='mt-8 flex flex-col gap-2'>
            {[
              '✦ 100% Original product',
              '✦ Cash on delivery available',
              '✦ Easy return within 7 days'
            ].map((p, i) => (
              <p key={i} className='text-xs font-light' style={{ color: '#6B7B6B', letterSpacing: '0.5px' }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Description Tab */}
      <div className='mt-20'>
        <div className='flex gap-0'>
          {['description', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className='text-xs tracking-widest px-8 py-4 transition-all duration-300'
              style={{
                background: activeTab === tab ? '#1A2E1A' : 'transparent',
                color: activeTab === tab ? '#C9A84C' : '#6B7B6B',
                border: '1px solid #C9A84C30',
                fontFamily: 'Montserrat, sans-serif',
                cursor: 'pointer'
              }}
            >
              {tab === 'description' ? 'DESCRIPTION' : 'REVIEWS (122)'}
            </button>
          ))}
        </div>
        <div className='p-8 text-sm font-light leading-relaxed' style={{ border: '1px solid #C9A84C20', color: '#6B7B6B' }}>
          {activeTab === 'description' ? (
            <p>{productData.description} This piece is crafted with premium materials, ensuring comfort and durability. Perfect for any occasion, it embodies the Vetro philosophy of blending style with purpose.</p>
          ) : (
            <p>122 verified customer reviews. Average rating: 4.2/5. Customers love the quality, fit, and unique design of this piece.</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0' />
}

export default Product