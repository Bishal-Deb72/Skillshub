import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyCourses() {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isEducator) {
      (async () => {
        await fetchEducatorCourses();
      })();
    }
  }, [isEducator]);

  if (!courses) return <Loading />;

  return (
    <div className='min-h-screen flex flex-col items-start p-4 pt-8 md:p-8'>
      <div className='w-full'>
        <h1 className='pb-4 text-xl md:text-2xl font-semibold text-gray-800'>My Courses</h1>
        
        {/* Desktop Table */}
        <div className='hidden md:block overflow-hidden rounded-md bg-white border border-gray-500/20 shadow-lg'>
          <table className='w-full'>
            <thead className='text-gray-900 border-b border-gray-500/20 bg-blue-100'>
              <tr>
                <th className='px-6 py-4 font-semibold text-lg text-gray-700'>All Courses</th>
                <th className='px-6 py-4 font-semibold text-lg text-gray-700'>Earnings</th>
                <th className='px-6 py-4 font-semibold text-lg text-gray-700'>Students</th>
                <th className='px-6 py-4 font-semibold text-lg text-gray-700'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {courses.map((course, index) => (
                <tr 
                  key={course._id} 
                  className={`border-b border-gray-500/20 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                  } hover:bg-blue-200`}
                >
                  <td className='px-6 py-4 flex items-center space-x-3'>
                    <img 
                      src={course.courseThumbnail} 
                      alt="Course" 
                      className='w-20 h-20 object-cover rounded-lg shadow-md' 
                    />
                    <span>{course.courseTitle}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='font-semibold text-gray-800'>
                      {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <span className='text-gray-700'>{course.enrolledStudents.length}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-gray-600'>{new Date(course.createdAt).toLocaleDateString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className='md:hidden space-y-4'>
          {courses.map((course) => (
            <div 
              key={course._id} 
              className='bg-white rounded-lg shadow-md border border-gray-200 p-4'
            >
              <div className='flex items-start space-x-3'>
                <img 
                  src={course.courseThumbnail} 
                  alt="Course" 
                  className='w-16 h-16 object-cover rounded-lg' 
                />
                <div className='flex-1'>
                  <h3 className='font-medium text-gray-800 truncate'>{course.courseTitle}</h3>
                  <div className='grid grid-cols-2 gap-2 mt-2 text-sm'>
                    <div>
                      <p className='text-gray-500'>Earnings</p>
                      <p className='font-semibold text-gray-800'>
                        {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Students</p>
                      <p className='font-semibold text-gray-800'>{course.enrolledStudents.length}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='text-gray-500'>Published On</p>
                      <p className='text-gray-600'>{new Date(course.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;