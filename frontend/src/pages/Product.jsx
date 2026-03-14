import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

const {productId}=useParams();
const {products,currency,addToCart}=useContext(ShopContext);
const [productData,setProductData]=useState(false);
const[image,setImage]=useState('')
const [size,setSize]=useState('')

const fetchProductData=async()=>{

products.map((item)=>{
  if(item._id===productId){
    setProductData(item)
    setImage(item.image[0])
    
    
    return null;
  }
})
}

useEffect(()=>{
 fetchProductData(); 
},[productId,products])

  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
  {/* -------- Product Data -------- */}
  <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

    {/* -------- Product Image -------- */}
    <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
      {/* Image thumbnails */}
      <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
        {
          productData.image.map((item, index) => (
            <img
              onClick={() => setImage(item.startsWith('http') ? item : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000') + (item.startsWith('/') ? '' : '/') + item)} 
              src={item.startsWith('http') ? item : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000') + (item.startsWith('/') ? '' : '/') + item} 
              key={index} 
              className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
              alt="Product Thumbnail" 
            />
          ))
        }
      </div>

      {/* Main product image */}
      <div className='w-full sm:w-[80%] flex items-center justify-center'>
        <img className='w-full h-full max-h-[600px] object-contain' src={(image && image.startsWith && image.startsWith('http')) ? image : ((import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000') + (image && image.startsWith && image.startsWith('/') ? '' : '/') + image)} alt="Main Product" onError={(e)=>{e.target.onerror=null; e.target.src='/placeholder.png'}} />
      </div>
    </div>

    {/* -------- Product Info -------- */}
    <div className='flex-1'>
      {/* Product Name */}
      <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

      {/* Product Rating */}
      <div className='flex items-center gap-1 mt-2'>
        <img src={assets.star_icon} alt="Star Icon" className="w-3.5" />
        <img src={assets.star_icon} alt="Star Icon" className="w-3.5" />
        <img src={assets.star_icon} alt="Star Icon" className="w-3.5" />
        <img src={assets.star_icon} alt="Star Icon" className="w-3.5" />
        <img src={assets.star_dull_icon} alt="Star Dull Icon" className="w-3.5" />
        <p className='pl-2'>(122)</p>
      </div>

      {/* Product Price */}
      <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

      {/* Product Description */}
      <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

      {/* Product Size Selection */}
      <div className='flex flex-col gap-4 my-8'>
        <p>Select Size</p>
        <div className='flex gap-2'>
          {productData.sizes?.map((item, index) => (
            <button
              onClick={() => setSize(item)} 
              className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={() => size ? addToCart(productData._id, size) : alert("Please select a size!")} 
        className='bg-black text-white px-8 py-3 active:bg-gray-700'
      >
        ADD TO CART
      </button>

      {/* Additional Product Info */}
      <hr className='mt-8 sm:w-4/5'/>
      <div className='text-sm text-gray-500 flex flex-col gap-1'>
        <p>100% Original product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
    </div>
  </div>

  {/* -------- Product Description Tab -------- */}
  <div className='mt-20'>
    <div className='flex'>
      <b className='border px-5 py-3 text-sm'>Description</b>
      <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
    </div>
    <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique repellat, impedit non totam quod exercitationem ex officiis earum soluta fuga blanditiis. Placeat error nesciunt excepturi, autem earum necessitatibus vitae commodi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic numquam facere, quasi quae architecto harum expedita. Similique amet, quisquam et eveniet nemo ab eos officia, sunt distinctio blanditiis aspernatur tenetur?</p>
    </div>
  </div>

  {/* -------- Related Products -------- */}
  <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

</div>

  ) : <div className='opacity-0'></div>
}

export default Product