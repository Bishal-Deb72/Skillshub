import React from 'react'
import { assets } from '../../assets/assets'

function CallToAction() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 pt-10 pb-24 px-8 md:px-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-md w-full md:max-w-5xl mx-auto'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold text-center leading-tight md:leading-normal'>
        Learn anything, anytime, anywhere
      </h1>
      <p className='text-gray-600 sm:text-sm text-center mt-4 max-w-2xl mx-auto'>
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className='flex items-center gap-6 mt-6'>
        <button className='px-12 py-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105'>
          Get Started
        </button>
        <button className='flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-all duration-300 font-medium'>
          Learn More <img src={assets.arrow_icon} alt="arrow_icon" className='transition-transform duration-300 transform hover:translate-x-2' />
        </button>
      </div>
    </div>
  )
}

export default CallToAction
