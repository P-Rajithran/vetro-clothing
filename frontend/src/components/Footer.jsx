import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ background: '#1A2E1A', marginTop: '80px' }}>

      {/* Gold top border */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

      <div className='px-8 sm:px-16 py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-12'>

          {/* Brand */}
          <div>
            <div className='flex flex-col mb-6'>
              <img src={assets.logo} className='w-10 mb-2' alt="Vetro" style={{ filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C', fontSize: '20px', letterSpacing: '6px', fontWeight: '300' }}>
                VETRO
              </span>
            </div>
            <p className='text-xs font-light leading-relaxed' style={{ color: '#8A9E8A', maxWidth: '280px', lineHeight: '2' }}>
              We're not just building a brand — we're crafting a movement. Every piece blends style, comfort, and culture, designed for those who dare to stand out.
            </p>
            {/* Social links placeholder */}
            <div className='flex gap-4 mt-6'>
              {['IG', 'FB', 'TW'].map(s => (
                <div key={s} className='w-8 h-8 flex items-center justify-center cursor-pointer transition-all hover:opacity-70'
                  style={{ border: '1px solid #C9A84C40', color: '#C9A84C', fontSize: '10px', letterSpacing: '1px' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className='text-xs tracking-widest mb-6' style={{ color: '#C9A84C' }}>COMPANY</p>
            <ul className='flex flex-col gap-3'>
              {['Home', 'About Us', 'Collection', 'Contact'].map(item => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className='text-xs font-light transition-colors hover:opacity-100'
                    style={{ color: '#8A9E8A', letterSpacing: '0.5px' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <p className='text-xs tracking-widest mb-6' style={{ color: '#C9A84C' }}>POLICIES</p>
            <ul className='flex flex-col gap-3'>
              {['Delivery Policy', 'Privacy Policy', 'Return Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <p className='text-xs font-light cursor-pointer transition-colors hover:opacity-100'
                    style={{ color: '#8A9E8A', letterSpacing: '0.5px' }}>
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className='text-xs tracking-widest mb-6' style={{ color: '#C9A84C' }}>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3'>
              <li className='text-xs font-light' style={{ color: '#8A9E8A' }}>+91 9876543210</li>
              <li className='text-xs font-light' style={{ color: '#8A9E8A' }}>hello@vetro.com</li>
              <li className='text-xs font-light' style={{ color: '#8A9E8A' }}>Chennai, Tamil Nadu</li>
            </ul>

            {/* Newsletter */}
            <div className='mt-8'>
              <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C' }}>NEWSLETTER</p>
              <div className='flex'>
                <input
                  type="email"
                  placeholder='Your email'
                  className='flex-1 px-3 py-2 text-xs outline-none'
                  style={{ background: '#2D4A2D', border: '1px solid #C9A84C30', color: '#E8D5A3', fontFamily: 'Montserrat, sans-serif' }}
                />
                <button className='px-4 py-2 text-xs tracking-widest transition-all'
                  style={{ background: '#C9A84C', color: '#1A2E1A', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>
                  JOIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #C9A84C20' }}>
        <div className='px-8 sm:px-16 py-5 flex flex-col sm:flex-row justify-between items-center gap-2'>
          <p className='text-xs' style={{ color: '#6B7B6B' }}>
            © 2026 VETRO. ALL RIGHTS RESERVED.
          </p>
          <p className='text-xs' style={{ color: '#C9A84C40' }}>
            CRAFTED WITH PURPOSE
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer