import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/Productitem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    setCategory(prev =>
      prev.includes(e.target.value)
        ? prev.filter(item => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const toggleSubCategory = (e) => {
    setSubCategory(prev =>
      prev.includes(e.target.value)
        ? prev.filter(item => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  return (
    <div className='pt-10' style={{ borderTop: '1px solid #C9A84C30' }}>

      {/* Page Header */}
      <div className='text-center mb-12'>
        <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>DISCOVER</p>
        <h1 className='text-4xl font-light' style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1A2E1A' }}>Our Collection</h1>
        <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
      </div>

      <div className='flex flex-col sm:flex-row gap-8'>

        {/* Filter Sidebar */}
        <div className='min-w-56'>
          <p
            onClick={() => setShowFilter(!showFilter)}
            className='my-2 text-xs tracking-widest flex items-center cursor-pointer gap-2 sm:cursor-default'
            style={{ color: '#1A2E1A' }}
          >
            REFINE
            <img className={`h-2 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>

          {/* Category Filter */}
          <div className={`py-4 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}
            style={{ borderTop: '1px solid #C9A84C40', borderBottom: '1px solid #C9A84C40' }}>
            <p className='mb-4 text-xs tracking-widest' style={{ color: '#C9A84C' }}>CATEGORY</p>
            <div className='flex flex-col gap-3'>
              {['Men', 'Women', 'Kids'].map(cat => (
                <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                  <input
                    className='w-3 h-3 cursor-pointer accent-green-800'
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                  />
                  <span className='text-xs tracking-widest font-light transition-colors group-hover:opacity-70'
                    style={{ color: '#1A2E1A' }}>{cat.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className={`py-4 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}
            style={{ borderBottom: '1px solid #C9A84C40' }}>
            <p className='mb-4 text-xs tracking-widest' style={{ color: '#C9A84C' }}>TYPE</p>
            <div className='flex flex-col gap-3'>
              {[
                { label: 'TOPWEAR', value: 'TopWear' },
                { label: 'BOTTOMWEAR', value: 'Bottomwear' },
                { label: 'WINTERWEAR', value: 'Winterwear' }
              ].map(sub => (
                <label key={sub.value} className='flex items-center gap-3 cursor-pointer group'>
                  <input
                    className='w-3 h-3 cursor-pointer accent-green-800'
                    type="checkbox"
                    value={sub.value}
                    onChange={toggleSubCategory}
                  />
                  <span className='text-xs tracking-widest font-light transition-colors group-hover:opacity-70'
                    style={{ color: '#1A2E1A' }}>{sub.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className='mt-4 text-xs' style={{ color: '#6B7B6B' }}>
            {filterProducts.length} pieces
          </p>
        </div>

        {/* Products Grid */}
        <div className='flex-1'>
          {/* Sort Bar */}
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-light' style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1A2E1A' }}>
              All Pieces
            </h2>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className='text-xs tracking-widest px-4 py-2 outline-none cursor-pointer'
              style={{
                background: 'transparent',
                border: '1px solid #C9A84C40',
                color: '#1A2E1A',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              <option value="relevant">SORT: RELEVANT</option>
              <option value="low-high">PRICE: LOW — HIGH</option>
              <option value="high-low">PRICE: HIGH — LOW</option>
            </select>
          </div>

          {/* Products */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>

          {filterProducts.length === 0 && (
            <div className='text-center py-20'>
              <p className='text-xs tracking-widest' style={{ color: '#6B7B6B' }}>NO PIECES FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
