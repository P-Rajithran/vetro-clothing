import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='relative overflow-hidden' style={{ minHeight: '85vh' }}>
      
      {/* Background */}
      <div className='flex flex-col sm:flex-row h-full' style={{ minHeight: '85vh' }}>
        
        {/* Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center p-12 sm:p-16'
          style={{ background: '#F8F5EF' }}>
          <div className='max-w-md'>
            
            {/* Label */}
            <div className='flex items-center gap-3 mb-6'>
              <div style={{ width: '40px', height: '1px', background: '#C9A84C' }} />
              <p className='text-xs tracking-widest font-medium' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>
                NEW ARRIVALS
              </p>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1A2E1A', fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: '300', lineHeight: '1.1', letterSpacing: '-1px' }}>
              Crafted for<br />
              <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Those Who</em><br />
              Dare to Stand Out
            </h1>

            {/* Gold divider */}
            <div style={{ width: '60px', height: '1px', background: '#C9A84C', margin: '28px 0' }} />

            {/* Description */}
            <p className='text-sm font-light leading-relaxed mb-8' style={{ color: '#6B7B6B', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.5px' }}>
              Where style meets purpose. Every piece tells a story of culture, comfort, and originality.
            </p>

            {/* CTA */}
            <Link to='/collection'>
              <button className='group flex items-center gap-4 text-xs tracking-widest font-medium transition-all duration-300'
                style={{ color: '#1A2E1A', fontFamily: 'Montserrat, sans-serif' }}>
                <span style={{ 
                  background: '#1A2E1A', 
                  color: '#C9A84C', 
                  padding: '14px 32px', 
                  letterSpacing: '3px',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={e => { e.target.style.background = '#C9A84C'; e.target.style.color = '#1A2E1A'; }}
                  onMouseLeave={e => { e.target.style.background = '#1A2E1A'; e.target.style.color = '#C9A84C'; }}
                >
                  EXPLORE COLLECTION
                </span>
              </button>
            </Link>

            {/* Stats */}
            <div className='flex gap-8 mt-12'>
              {[
                { num: '53+', label: 'Pieces' },
                { num: '100%', label: 'Original' },
                { num: '7 Day', label: 'Returns' }
              ].map((stat, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#1A2E1A', fontWeight: '400' }}>{stat.num}</p>
                  <p className='text-xs tracking-widest' style={{ color: '#6B7B6B' }}>{stat.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className='w-full sm:w-1/2 relative overflow-hidden' style={{ minHeight: '400px' }}>
          <img
            className='w-full h-full object-cover'
            src={assets.hero_img}
            alt="Latest Collection"
            style={{ objectPosition: 'center top' }}
          />
          {/* Gold overlay accent */}
          <div className='absolute bottom-0 left-0 right-0 h-1' style={{ background: '#C9A84C' }} />
          
          {/* Floating label */}
          <div className='absolute bottom-8 left-8 px-4 py-3'
            style={{ background: 'rgba(26,46,26,0.85)', backdropFilter: 'blur(8px)', border: '1px solid #C9A84C40' }}>
            <p className='text-xs tracking-widest' style={{ color: '#C9A84C' }}>LATEST COLLECTION 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero