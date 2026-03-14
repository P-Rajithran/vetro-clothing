import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <>
      {/* Top announcement bar */}
      <div style={{ background: '#1A2E1A', color: '#C9A84C' }} className='text-center py-2 text-xs tracking-widest font-light'>
        FREE SHIPPING ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; LUXURY FASHION DELIVERED
      </div>

      <div className='flex items-center justify-between py-5 font-medium' style={{ borderBottom: '1px solid #C9A84C20' }}>

        {/* Logo */}
        <Link to='/'>
          <div className='flex flex-col items-start'>
            <img src={assets.logo} className='w-12' alt="Vetro Logo" />
            <span style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1A2E1A', fontSize: '18px', letterSpacing: '6px', fontWeight: '300' }}>
              
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <ul className='hidden sm:flex gap-8 text-xs tracking-widest' style={{ color: '#1A2E1A' }}>
          <NavLink to='/' className='flex flex-col items-center gap-1 group'>
            <p className='hover:opacity-70 transition-opacity'>HOME</p>
            <hr className='w-full border-none h-[1px] hidden group-[.active]:block' style={{ background: '#C9A84C' }} />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
            <p className='hover:opacity-70 transition-opacity'>COLLECTION</p>
            <hr className='w-full border-none h-[1px] hidden' style={{ background: '#C9A84C' }} />
          </NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
            <p className='hover:opacity-70 transition-opacity'>ABOUT</p>
            <hr className='w-full border-none h-[1px] hidden' style={{ background: '#C9A84C' }} />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
            <p className='hover:opacity-70 transition-opacity'>CONTACT</p>
            <hr className='w-full border-none h-[1px] hidden' style={{ background: '#C9A84C' }} />
          </NavLink>
        </ul>

        {/* Icons */}
        <div className='flex items-center gap-6'>
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className='w-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
            style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(20%) saturate(800%) hue-rotate(80deg)' }}
            alt="Search"
          />

          <div className='group relative'>
            <img
              onClick={() => token ? null : navigate('/login')}
              className='w-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
              style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(20%) saturate(800%) hue-rotate(80deg)' }}
              src={assets.profile_icon}
              alt="Profile"
            />
            {token &&
              <div className='group-hover:block hidden absolute right-0 pt-4 z-50'>
                <div className='flex flex-col gap-0 w-40 py-2' style={{ background: '#1A2E1A', border: '1px solid #C9A84C40' }}>
                  <p className='px-5 py-2 text-xs tracking-widest cursor-pointer transition-colors' style={{ color: '#C9A84C' }}
                    onMouseEnter={e => e.target.style.background = '#2D4A2D'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}>
                    MY PROFILE
                  </p>
                  <p onClick={() => navigate('/orders')}
                    className='px-5 py-2 text-xs tracking-widest cursor-pointer transition-colors'
                    style={{ color: '#C9A84C' }}
                    onMouseEnter={e => e.target.style.background = '#2D4A2D'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}>
                    MY ORDERS
                  </p>
                  <p onClick={logout}
                    className='px-5 py-2 text-xs tracking-widest cursor-pointer'
                    style={{ color: '#C9A84C' }}
                    onMouseEnter={e => e.target.style.background = '#2D4A2D'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}>
                    LOGOUT
                  </p>
                </div>
              </div>}
          </div>

          <Link to='/cart' className='relative'>
            <img
              src={assets.cart_icon}
              className='w-4 min-w-4 opacity-70 hover:opacity-100 transition-opacity'
              style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(20%) saturate(800%) hue-rotate(80deg)' }}
              alt="Cart"
            />
            {getCartCount() > 0 && (
              <p className='absolute right-[-8px] bottom-[-8px] w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-medium'
                style={{ background: '#C9A84C', color: '#1A2E1A' }}>
                {getCartCount()}
              </p>
            )}
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-4 cursor-pointer sm:hidden'
            style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(20%) saturate(800%) hue-rotate(80deg)' }}
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden transition-all duration-300 ${visible ? 'w-72' : 'w-0'}`}
        style={{ background: '#1A2E1A' }}>
        <div className='flex flex-col h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-6 cursor-pointer' style={{ borderBottom: '1px solid #C9A84C30' }}>
            <img className='h-4 rotate-180' style={{ filter: 'invert(1)' }} src={assets.dropdown_icon} alt="" />
            <p className='text-xs tracking-widest' style={{ color: '#C9A84C' }}>CLOSE</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-4 px-6 text-xs tracking-widest border-b' style={{ color: '#E8D5A3', borderColor: '#C9A84C20' }} to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 px-6 text-xs tracking-widest border-b' style={{ color: '#E8D5A3', borderColor: '#C9A84C20' }} to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 px-6 text-xs tracking-widest border-b' style={{ color: '#E8D5A3', borderColor: '#C9A84C20' }} to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 px-6 text-xs tracking-widest' style={{ color: '#E8D5A3' }} to='/contact'>CONTACT</NavLink>
        </div>
      </div>
      {visible && <div className='fixed inset-0 z-40 bg-black bg-opacity-50' onClick={() => setVisible(false)} />}
    </>
  )
}

export default Navbar
