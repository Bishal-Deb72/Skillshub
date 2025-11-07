import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/student/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyEnrollments() {

  const { enrolledCourses, calculateCourseDuration, navigate, userData, fetchUserEnrolledCourses, backendUrl, getToken, calculateNoOfLecture } = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([])

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(`${backendUrl}/api/user/get-course-progress`, { courseId: course._id }, { headers: { Authorization: `Bearer ${token}` } })
          let totalLectures = calculateNoOfLecture(course);

          const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
          return { totalLectures, lectureCompleted }
        })
      )
      setProgressArray(tempProgressArray);

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses()
    }

  }, [userData])

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress()
    }

  }, [enrolledCourses])

  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>My Enrollments</h1>
        <table className='w-full overflow-hidden border mt-10'>
          <thead className='bg-gray-200 text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold text-gray-700'>Course</th>
              <th className='px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell'>Duration</th>
              <th className='px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell'>Completed</th>
              <th className='px-4 py-3 font-semibold text-gray-700'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {enrolledCourses.map((course, index) => (
              <tr key={index} className='border-b border-gray-500/20 hover:bg-gray-50 transition-all'>
                <td className='px-4 py-4 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt="" className='w-16 sm:w-24 md:w-28' />
                  <div className='flex-1'>
                    <p className='text-lg font-medium text-gray-800'>{course.courseTitle}</p>
                    <div className='mt-2'>
                      <Line 
                        strokeWidth={4} 
                        percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} 
                        strokeColor='#4CAF50' 
                        trailColor='#E0E0E0' 
                        className='rounded-full'
                      />
                    </div>
                  </div>
                </td>
                <td className='px-4 py-3 text-gray-600 hidden sm:table-cell'>
                  {calculateCourseDuration(course)}
                </td>
                <td className='px-4 py-3 text-gray-600 hidden sm:table-cell'>
                  {progressArray[index] && `${progressArray[index].lectureCompleted} /${progressArray[index].totalLectures}`} <span className='text-sm'>Lectures</span>
                </td>
                <td className='px-4 py-3 text-right'>
                  <button className='px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all' onClick={() => navigate('/player/' + course._id)}>
                    {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'On Going'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollments
