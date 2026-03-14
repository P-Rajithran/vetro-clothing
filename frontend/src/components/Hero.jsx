import React from 'react'
import { assets } from '../assets/assets'

const Hero= () => {
  return (
<div className='flex flex-col sm:flex-row border border-[#1C2529] rounded-xl overflow-hidden'>
  {/* Hero Left Side */}
  <div className='w-full sm:w-1/2 flex items-center justify-center p-8 bg-[#f8f9fa]'>
    <div className='text-[#1C2529] space-y-4 max-w-md'>
      {/* Top Decoration Line + Label */}
      <div className='flex items-center gap-3'>
        <p className='w-8 md:w-11 h-[2px] bg-[#5D9478]'></p>
        <p className='font-semibold text-sm md:text-base text-[#5D9478] '>OUR BESTSELLERS</p>
      </div>

      {/* Title */}
      <h1 className='prata-regular text-3xl lg:text-5xl leading-snug'>
        Latest Arrivals
      </h1>

      {/* Bottom CTA + Decoration */}
      <div className='flex items-center gap-3'>
        <p className='font-semibold text-sm md:text-base text-[#5D9478]'>SHOP NOW</p>
        <p className='w-8 md:w-11 h-[2px] bg-[#5D9478]'></p>
      </div>
    </div>
  </div>

  {/* Hero Right Side */}
  <img className='w-full sm:w-1/2 object-cover' src={assets.hero_img} alt="Latest Collection" />
</div>

  )
}

export default Hero
