import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  // Load cart and token from local storage
  useEffect(() => {
    const localCart = localStorage.getItem('cartItems');
    const storedToken = localStorage.getItem('token');

    if (localCart) setCartItems(JSON.parse(localCart));
    if (storedToken) {
      setToken(storedToken);
      if (!localCart) getUserCart(storedToken);
    }
  }, []);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  // Save cart to local storage whenever cartItems updates
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error('Select Product');

    const updatedCart = { 
      ...cartItems, 
      [itemId]: { ...cartItems[itemId], [size]: (cartItems[itemId]?.[size] || 0) + 1 } 
    };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error adding to cart');
      }
    }
  };

  // ✅ Update cart item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity <= 0) return;

    const updatedCart = { 
      ...cartItems, 
      [itemId]: { ...cartItems[itemId], [size]: quantity } 
    };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.put(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error updating cart');
      }
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (itemId, size) => {
    if (!cartItems[itemId]?.[size]) return;

    const updatedCart = { ...cartItems };
    delete updatedCart[itemId][size];
    if (Object.keys(updatedCart[itemId]).length === 0) delete updatedCart[itemId];

    setCartItems({ ...updatedCart });

    if (token) {
      try {
        await axios.delete(`${backendUrl}/api/cart/remove`, { data: { itemId, size }, headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error removing item');
      }
    }
  };

  // ✅ Fetch user cart from backend
  const getUserCart = async (userToken) => {
    try {
      const res = await axios.get(`${backendUrl}/api/cart`, { headers: { Authorization: `Bearer ${userToken}` } });
      if (res.data.success && res.data.cartData) setCartItems(res.data.cartData);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error fetching cart');
    }
  };

  // ✅ Fetch product data
  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Server error while fetching products.');
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  return (
    <ShopContext.Provider value={{
      products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
      cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, 
      removeFromCart, navigate, backendUrl, token, setToken
    }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;