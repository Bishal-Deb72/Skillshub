import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

function CourseList() {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input ?
        setFilteredCourse(tempCourses.filter(item => item.courseTitle.toLowerCase().includes(input.toLowerCase())))
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className='relative px-4 sm:px-8 md:px-16 lg:px-36 pt-12 md:pt-20 text-left'>
        {/* Title Section */}
        <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-start justify-between w-full'>
          <div className='w-full md:w-auto'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300'>
              Course List
            </h1>
            <p className='text-sm sm:text-base text-gray-500 mt-1'>
              <span 
                className='text-blue-600 cursor-pointer hover:underline' 
                onClick={() => navigate('/')}
              >
                Home
              </span> / Course List
            </p>
          </div>
          <div className='w-full md:w-auto mt-4 md:mt-0'>
            <SearchBar data={input} />
          </div>
        </div>

        {/* Search Results Display */}
        {input && (
          <div className='inline-flex items-center gap-2 sm:gap-4 px-3 py-1 sm:px-4 sm:py-2 border mt-6 -mb-4 text-sm sm:text-base text-gray-600 rounded-md shadow-sm hover:shadow-md transition-all'>
            <p className='truncate max-w-[150px] sm:max-w-none'>{input}</p>
            <img 
              src={assets.cross_icon} 
              alt="Clear search" 
              className='w-4 h-4 cursor-pointer' 
              onClick={() => navigate('/course-list')} 
            />
          </div>
        )}

        {/* Course Grid */}
        {filteredCourse.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 sm:my-12 gap-4 sm:gap-6'>
            {filteredCourse.map((course, index) => (
              <div 
                key={index} 
                className='bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-all hover:-translate-y-1 border border-gray-200'
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className='my-16 text-center'>
            <h3 className='text-xl text-gray-600'>No courses found</h3>
            {input && (
              <button 
                onClick={() => navigate('/course-list')}
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CourseList;