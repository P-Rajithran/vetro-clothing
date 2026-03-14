import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
       <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
         <img className='w-ful md:max-w-[450px]' src={assets.about_img} alt="" />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>At Vetro, we believe fashion is more than just clothing — it's a statement. Every collection we drop is rooted in creativity, crafted with detail, and inspired by real stories. We don’t follow trends, we create waves. Our mission is to empower a generation that chooses to stand out, not fit in.

</p>
              <p>From sketch to stitch, we focus on quality, comfort, and culture. Whether you're chasing dreams or breaking limits, Vetro is made for your journey. This isn’t just a brand. This is your identity — raw, fearless, and original. Welcome to the movement.

</p>
               <b className='text-gray-800'>Our Mission</b>
               <p>We’re here to spark a movement.
At Vetro, we exist to inspire ambition, fuel confidence, and redefine what it means to wear purpose. Every product we create is designed to push boundaries — in style, mindset, and life.

We aim to empower individuals to rise above the noise, express themselves fearlessly, and chase their vision without limits.
This is more than fashion. This is your daily reminder that greatness starts with how you show up.</p>
         </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
        
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>At Vetro, every piece is crafted with precision and pride. We don’t just deliver products — we deliver excellence. From fabric to finish, our commitment to quality ensures you get nothing less than the best.

</p>
            </div> 
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>Your time matters. That’s why we’ve built a smooth, hassle-free shopping experience — from browsing to checkout. With fast delivery and easy navigation, getting your favorite styles is just a few clicks away.</p>
            </div> 
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>We’re not just here to sell — we’re here to support. Our team is always ready to assist you with genuine care, quick solutions, and a customer-first attitude. Your satisfaction is our top priority, always.

</p>
            </div> 
             
        </div>
        <NewsLetterBox/>

    </div>
  )
}

export default About