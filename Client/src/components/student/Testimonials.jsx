import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import { motion } from 'framer-motion'

function Testimonials() {
  return (
    <div className='pb-14 px-8 md:px-0'>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-3xl font-semibold text-gray-800 text-center'
      >
        Testimonials
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className='md:text-base text-gray-600 mt-3 text-center max-w-2xl mx-auto'
      >
        Hear from our learners as they share their journeys of transformation, success, and how our
        <br /> platform has made a difference in their lives.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mt-14'
      >
        {dummyTestimonial.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)' }}
            transition={{ duration: 0.3 }}
            className='text-sm text-left border border-gray-300 pb-6 rounded-lg bg-white shadow-lg overflow-hidden'
          >
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-100'>
              <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className='text-lg font-semibold text-gray-800'>{testimonial.name}</h1>
                <p className='text-gray-600'>{testimonial.role}</p>
              </div>
            </div>
            <div className='p-5 pb-7'>
              <div className='flex gap-1'>
                {[...Array(5)].map((_, i) => (
                  <img
                    className='h-5 transition-all duration-300 hover:scale-125'
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className='text-gray-500 mt-5 italic'>{testimonial.feedback}</p>
            </div>
            <a
              href="#"
              className='text-blue-500 underline px-5 transition-all duration-300 hover:text-blue-700 hover:font-medium'
            >
              Read more
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Testimonials
