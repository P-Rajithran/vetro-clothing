import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler=(event)=>{
    event.preventDefault();
  }

  return (
    <div className='text-centerp'>
   <p className='text-2xl font-medium text-gray-800'>Subscribe now&get 20% off</p>
   <p className='text-gray-400 mt-3'>Join the tribe. Subscribe now and unlock exclusive drops, secret deals, and early access to fire collections. This is your VIP pass to level up your style.</p>


    <form className='w-full sm:1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
         <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
    <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    
    </div>
  )
}

export default NewsLetterBox