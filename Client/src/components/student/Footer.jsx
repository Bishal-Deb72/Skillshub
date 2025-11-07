import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <footer className='bg-gray-900 w-full mt-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16 lg:gap-32 py-10 border-b border-white/30'>
          {/* Logo and Description */}
          <div className='flex flex-col items-center md:items-start w-full md:w-auto'>
            <img src={assets.logo_dark} alt="Company logo" className='h-10 w-auto' />
            <p className='mt-4 md:mt-6 text-center md:text-left text-sm text-white/80 max-w-md'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quibusdam, minus rem aperiam ex nisi aspernatur quasi repudiandae officiis consequatur.
            </p>
          </div>

          {/* Company Links */}
          <div className='flex flex-col items-center md:items-start w-full md:w-auto'>
            <h2 className='font-semibold text-white mb-4 md:mb-5 text-lg'>Company</h2>
            <ul className='grid grid-cols-2 gap-x-8 gap-y-2 md:flex md:flex-col text-sm text-white/80'>
              <li className='hover:text-white transition-colors'><a href="#">Home</a></li>
              <li className='hover:text-white transition-colors'><a href="#">About us</a></li>
              <li className='hover:text-white transition-colors'><a href="#">Contact us</a></li>
              <li className='hover:text-white transition-colors'><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter - Hidden on small screens */}
          <div className='hidden md:flex flex-col w-full md:w-auto max-w-md'>
            <h2 className='font-semibold text-white mb-5 text-lg'>Subscribe to our newsletter</h2>
            <p className='text-sm text-white/80 mb-4'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, eius!
            </p>
            <div className='flex flex-col sm:flex-row gap-2'>
              <input 
                type="email" 
                placeholder='Enter your email'
                className='flex-1 border border-gray-500/30 bg-gray-800 text-white placeholder-gray-400 outline-none h-10 rounded px-3 text-sm focus:border-blue-500 transition-colors' 
              />
              <button className='bg-blue-600 hover:bg-blue-700 px-4 h-10 text-white rounded transition-colors whitespace-nowrap'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className='py-6 text-center text-xs md:text-sm text-white/60'>
          Copyright © {new Date().getFullYear()} GreatStack. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer