import React from 'react'
import { assets } from '../../assets/assets.js'
import SearchBar from './SearchBar.jsx'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center 
      bg-gradient-to-b from-cyan-100 to-blue-50 min-h-[80vh] relative'>

      {/* Title Animation */}
      <motion.h1 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className='md:text-5xl text-3xl font-extrabold text-gray-800 max-w-3xl mx-auto leading-tight relative'
      >
        Empower your future with courses designed to 
        <span className='text-blue-600 relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-1 before:bg-blue-400'>
          fit your choice.
        </span>
        <motion.img 
          src={assets.sketch} 
          alt="sketch" 
          className='md:block hidden absolute -bottom-7 right-0' 
          animate={{ y: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
        />
      </motion.h1>

      {/* Subtitle Animations */}
      <motion.p 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.3 }} 
        className='md:block hidden text-gray-600 max-w-2xl mx-auto text-lg'
      >
        We bring together world-class instructors, interactive content, and a supportive community to help you 
        <span className="text-blue-600 font-semibold"> achieve your personal and professional goals.</span>
      </motion.p>

      <motion.p 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }} 
        className='md:hidden text-gray-500 max-w-sm mx-auto text-base'
      >
        We bring together world-class instructors to help you achieve your goals.
      </motion.p>

      {/* Search Bar with Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.6 }} 
      >
        <SearchBar />
      </motion.div>

      {/* Decorative Blur Effects */}
      <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 right-1/4 w-60 h-60 bg-cyan-200 opacity-20 rounded-full blur-3xl"></div>
    </div>
  )
}

export default Hero
