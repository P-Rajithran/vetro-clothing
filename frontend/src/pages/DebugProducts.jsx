import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const DebugProducts = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Debug Products ({products?.length || 0})</h2>
      <pre className="text-xs max-h-[60vh] overflow-auto bg-gray-100 p-4">{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default DebugProducts;
