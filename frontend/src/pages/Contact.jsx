import React, { useState } from 'react'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>

      {/* Header */}
      <div className='pt-16 pb-12 text-center' style={{ borderTop: '1px solid #C9A84C30', background: '#F8F5EF' }}>
        <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>REACH OUT</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', color: '#1A2E1A', fontWeight: '300' }}>
          Contact Us
        </h1>
        <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
        <p className='text-xs tracking-widest' style={{ color: '#6B7B6B' }}>WE'D LOVE TO HEAR FROM YOU</p>
      </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row gap-0 mb-20'>

        {/* Image + Info */}
        <div className='md:w-1/2 relative overflow-hidden' style={{ minHeight: '500px' }}>
          <img
            className='w-full h-full object-cover'
            style={{ minHeight: '500px' }}
            src={assets.contact_img}
            alt="Contact Vetro"
          />
          {/* Overlay */}
          <div className='absolute inset-0 flex flex-col justify-end p-10'
            style={{ background: 'linear-gradient(to top, rgba(26,46,26,0.9) 0%, transparent 50%)' }}>
            <div>
              <p className='text-xs tracking-widest mb-4' style={{ color: '#C9A84C' }}>OUR STORE</p>
              <p className='text-sm font-light mb-2' style={{ color: '#E8D5A3' }}>
                No:10, ABCD Nagar, 7th Street<br />
                Anna Nagar, Chennai — 600040
              </p>
              <div style={{ width: '30px', height: '1px', background: '#C9A84C', margin: '16px 0' }} />
              <p className='text-sm font-light' style={{ color: '#E8D5A3' }}>
                +91 9876543210<br />
                hello@vetro.com
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='md:w-1/2 p-12 flex flex-col justify-center' style={{ background: '#1A2E1A' }}>
          <p className='text-xs tracking-widest mb-2' style={{ color: '#C9A84C' }}>SEND A MESSAGE</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#E8D5A3', fontWeight: '300', marginBottom: '32px' }}>
            Let's Talk
          </h2>

          {submitted ? (
            <div className='text-center py-8'>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: '#C9A84C' }}>
                Message Sent
              </p>
              <div style={{ width: '30px', height: '1px', background: '#C9A84C', margin: '12px auto' }} />
              <p className='text-xs tracking-widest' style={{ color: '#8A9E8A' }}>WE'LL BE IN TOUCH SOON</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <div>
                <label className='text-xs tracking-widest block mb-2' style={{ color: '#8A9E8A' }}>YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-3 text-sm outline-none'
                  style={{ background: '#2D4A2D', border: '1px solid #C9A84C30', color: '#E8D5A3', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder='YourName'
                />
              </div>
              <div>
                <label className='text-xs tracking-widest block mb-2' style={{ color: '#8A9E8A' }}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className='w-full px-4 py-3 text-sm outline-none'
                  style={{ background: '#2D4A2D', border: '1px solid #C9A84C30', color: '#E8D5A3', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder='your@email.com'
                />
              </div>
              <div>
                <label className='text-xs tracking-widest block mb-2' style={{ color: '#8A9E8A' }}>MESSAGE</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className='w-full px-4 py-3 text-sm outline-none resize-none'
                  style={{ background: '#2D4A2D', border: '1px solid #C9A84C30', color: '#E8D5A3', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder='How can we help you?'
                />
              </div>
              <button
                type='submit'
                className='text-xs tracking-widest transition-all duration-300 mt-2'
                style={{
                  background: '#C9A84C',
                  color: '#1A2E1A',
                  border: 'none',
                  padding: '16px',
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer',
                  letterSpacing: '3px',
                  fontWeight: '600'
                }}
                onMouseEnter={e => { e.target.style.background = '#E8D5A3'; }}
                onMouseLeave={e => { e.target.style.background = '#C9A84C'; }}
              >
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-0 mb-20 px-8 sm:px-16'>
        {[
          { icon: '📍', title: 'VISIT US', info: 'Anna Nagar, Chennai\nTamil Nadu — 600040' },
          { icon: '📞', title: 'CALL US', info: '+91 9876543210\nMon–Sat, 10am–7pm' },
          { icon: '✉️', title: 'EMAIL US', info: 'hello@vetro.com\nReply within 24 hours' }
        ].map((card, i) => (
          <div key={i} className='p-8 text-center' style={{ border: '1px solid #C9A84C20', background: '#F8F5EF' }}>
            <p className='text-2xl mb-4'>{card.icon}</p>
            <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C' }}>{card.title}</p>
            <p className='text-xs font-light leading-relaxed whitespace-pre-line' style={{ color: '#6B7B6B' }}>{card.info}</p>
          </div>
        ))}
      </div>

      <div className='px-8 sm:px-16'>
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Contact