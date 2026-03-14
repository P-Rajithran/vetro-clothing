import React from 'react'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className='relative pt-16 pb-20' style={{ borderTop: '1px solid #C9A84C30', background: '#F8F5EF' }}>
        <div className='text-center mb-16'>
          <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>OUR STORY</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', color: '#1A2E1A', fontWeight: '300' }}>
            About Vetro
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
        </div>

        {/* Story Section */}
        <div className='flex flex-col md:flex-row gap-16 px-8 sm:px-16 max-w-6xl mx-auto'>
          <div className='md:w-1/2 overflow-hidden' style={{ background: '#F0EDE6' }}>
            <img
              className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
              style={{ maxHeight: '560px', objectFit: 'cover' }}
              src={assets.about_img}
              alt="About Vetro"
            />
          </div>
          <div className='md:w-1/2 flex flex-col justify-center gap-8'>
            <div>
              <p className='text-xs tracking-widest mb-4' style={{ color: '#C9A84C' }}>WHO WE ARE</p>
              <p className='text-sm font-light leading-loose' style={{ color: '#4A5E4A', fontFamily: 'Montserrat, sans-serif' }}>
                At Vetro, we believe fashion is more than just clothing — it's a statement. Every collection we drop is rooted in creativity, crafted with detail, and inspired by real stories. We don't follow trends, we create waves.
              </p>
            </div>
            <div style={{ width: '40px', height: '1px', background: '#C9A84C30' }} />
            <div>
              <p className='text-sm font-light leading-loose' style={{ color: '#4A5E4A', fontFamily: 'Montserrat, sans-serif' }}>
                From sketch to stitch, we focus on quality, comfort, and culture. Whether you're chasing dreams or breaking limits, Vetro is made for your journey. This isn't just a brand. This is your identity — raw, fearless, and original.
              </p>
            </div>
            <div style={{ width: '40px', height: '1px', background: '#C9A84C30' }} />
            <div>
              <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C' }}>OUR MISSION</p>
              <p className='text-sm font-light leading-loose' style={{ color: '#4A5E4A', fontFamily: 'Montserrat, sans-serif' }}>
                We exist to inspire ambition, fuel confidence, and redefine what it means to wear purpose. Every product pushes boundaries — in style, mindset, and life. This is your daily reminder that greatness starts with how you show up.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='py-20 px-8 sm:px-16'>
        <div className='text-center mb-16'>
          <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C' }}>THE VETRO DIFFERENCE</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', color: '#1A2E1A', fontWeight: '300' }}>
            Why Choose Us
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto'>
          {[
            {
              num: '01',
              title: 'Quality Assurance',
              desc: 'Every piece is crafted with precision and pride. From fabric to finish, our commitment to quality ensures you get nothing less than the best.'
            },
            {
              num: '02',
              title: 'Convenience',
              desc: 'Your time matters. We built a smooth, hassle-free shopping experience — from browsing to checkout, fast delivery, easy navigation.'
            },
            {
              num: '03',
              title: 'Customer Service',
              desc: "We're not just here to sell — we're here to support. Our team is always ready with genuine care, quick solutions, and a customer-first attitude."
            }
          ].map((item, i) => (
            <div
              key={i}
              className='p-10 flex flex-col gap-6 group transition-all duration-300'
              style={{ border: '1px solid #C9A84C20', background: i === 1 ? '#1A2E1A' : '#F8F5EF' }}
            >
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', color: '#C9A84C', fontWeight: '300', lineHeight: '1' }}>
                {item.num}
              </p>
              <div style={{ width: '30px', height: '1px', background: '#C9A84C' }} />
              <p className='text-xs tracking-widest font-medium' style={{ color: i === 1 ? '#C9A84C' : '#1A2E1A' }}>
                {item.title.toUpperCase()}
              </p>
              <p className='text-sm font-light leading-relaxed' style={{ color: i === 1 ? '#8A9E8A' : '#6B7B6B' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className='py-16 px-8' style={{ background: '#1A2E1A' }}>
        <div className='flex flex-wrap justify-center gap-16 max-w-4xl mx-auto'>
          {[
            { num: '53+', label: 'UNIQUE PIECES' },
            { num: '100%', label: 'ORIGINAL DESIGN' },
            { num: '7 DAY', label: 'EASY RETURNS' },
            { num: '24/7', label: 'CUSTOMER SUPPORT' }
          ].map((stat, i) => (
            <div key={i} className='text-center'>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', color: '#C9A84C', fontWeight: '300' }}>
                {stat.num}
              </p>
              <p className='text-xs tracking-widest mt-1' style={{ color: '#8A9E8A' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='px-8 sm:px-16'>
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default About