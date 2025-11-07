import React from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

function CourseSection() {
  const { allCourses } = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8 text-center '>
      {/* Title with Hover Effect */}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        whileHover={{ scale: 1.05, textShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
        className='text-3xl font-semibold text-gray-800 transition-all duration-300 cursor-pointer'
      >
        Learn from the Best
      </motion.h2>

      {/* Subtitle with Animation */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }} 
        className='text-sm md:text-base text-gray-600 mt-2 max-w-2xl mx-auto'
      >
        Discover top-rated courses across various categories. From coding and design to 
        <span className="text-blue-600 font-medium"> business and wellness</span>, our courses are crafted to deliver results.
      </motion.p> 

      {/* Courses Grid with Hover Effects */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.4 }} 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-6'
      >
        {allCourses.slice(0, 4).map((course, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.3 }}
            className='rounded-lg overflow-hidden'
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      {/* Button with Hover Effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.6 }} 
      >
        <Link 
          to={'/course-list'} 
          onClick={() => scrollTo(0,0)}
          className='text-gray-500 border border-gray-400/40 px-10 py-3 rounded-lg transition-all duration-300 
            hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 hover:shadow-lg'
        >
          Show All Courses
        </Link>
      </motion.div>
    </div>
  )
}

export default CourseSection
