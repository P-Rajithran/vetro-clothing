import React from 'react'
import { assets } from '../assets/assets'


const Footer = () => {
  return (
    <div>
       <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>


            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
                <p className='w-full md:w-2/3 text-gray-600'>
                At Vetro, we're not just building a brand — we're crafting a movement. Every piece we create blends style, comfort, and culture, designed for those who dare to stand out. From concept to collection, we stay rooted in originality, driven by purpose, and fueled by passion. This is more than fashion. This is Vetro.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 9876543210</li>
                    <li>xyz@gamil.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
                <p className='py-5 text-sm text-center'>Copyright 2025@ vetro.com - All Right Reserved</p>
            
        </div>
    </div>
  )
}

export default Footer