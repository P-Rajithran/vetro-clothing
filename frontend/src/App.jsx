import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

import { ToastContainer, toast } from 'react-toastify';
import AddProduct from './pages/AddProduct';
import DebugProducts from './pages/DebugProducts';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      {/* ✅ DEMO BANNER — sits outside the padded div so it's full width */}
      <div className="demo-banner">
        ⚠️ This is a demo store — Please create a free account to explore all features. No real payments.
      </div>

      <div className='px-4 sm:px-[7vw] md:px-[5vw] lg:px-[3vw]'>
        <ToastContainer/>
        <Navbar />
        <SearchBar/>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/about'  element={<About/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/place-order' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/debug/products" element={<DebugProducts/>} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App