import React from 'react'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

function Companies() {
  return (
    <div className='pt-16 text-center bg-gradient-to-b from-blue-50 to-white py-10'>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        className='text-lg text-gray-600 font-medium'
      >
        Trusted by Learners from
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, delay: 0.3 }} 
        className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'
      >
        {[
          { src: assets.microsoft_logo, alt: "Microsoft" },
          { src: assets.walmart_logo, alt: "Walmart" },
          { src: assets.accenture_logo, alt: "Accenture" },
          { src: assets.adobe_logo, alt: "Adobe" },
          { src: assets.paypal_logo, alt: "PayPal" },
        ].map((company, index) => (
          <motion.img
            key={index}
            src={company.src}
            alt={company.alt}
            className='w-20 md:w-28 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-105 hover:shadow-md'
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Companies
