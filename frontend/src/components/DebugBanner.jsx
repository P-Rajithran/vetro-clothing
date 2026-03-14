import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

const DebugBanner = () => {
  const { products } = useContext(ShopContext);

  useEffect(() => {
    // Expose products to the window for quick inspection in browser console
    if (typeof window !== 'undefined') {
      window.__PRODUCTS__ = products;
      window.__PRODUCTS_UPDATED_AT__ = new Date().toISOString();
      console.log('DebugBanner: products count =', products?.length || 0);
    }
  }, [products]);

  return (
    <div style={{position:'fixed',right:12,top:12,zIndex:9999,background:'#fff',border:'1px solid #e5e7eb',padding:8,borderRadius:6,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
      <div style={{fontSize:12,fontWeight:600}}>Products: {products?.length || 0}</div>
      <div style={{fontSize:11,color:'#374151'}}>Open console: window.__PRODUCTS__</div>
    </div>
  );
};

export default DebugBanner;
