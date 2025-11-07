import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

function Dashboard() {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
    fetchDashboardData()
  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-center justify-start gap-8 md:p-8 p-4'>
      <div className='space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full'>
        {/* Card for Total Enrollments */}
        <div className='flex items-center gap-6 shadow-lg border rounded-xl p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 hover:shadow-2xl transition-all duration-300'>
          <img src={assets.patients_icon} alt="patients_icon" className='w-16 h-16'/>
          <div>
            <p className='text-4xl font-semibold text-gray-800'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-xl text-gray-600'>Total Enrollments</p>
          </div>
        </div>

        {/* Card for Total Courses */}
        <div className='flex items-center gap-6 shadow-lg border rounded-xl p-6 bg-gradient-to-r from-green-100 via-green-200 to-green-300 hover:shadow-2xl transition-all duration-300'>
          <img src={assets.appointments_icon} alt="appointments_icon" className='w-16 h-16'/>
          <div>
            <p className='text-4xl font-semibold text-gray-800'>{dashboardData.totalCourses}</p>
            <p className='text-xl text-gray-600'>Total Courses</p>
          </div>
        </div>

        {/* Card for Total Earnings */}
        <div className='flex items-center gap-6 shadow-lg border rounded-xl p-6 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 hover:shadow-2xl transition-all duration-300'>
          <img src={assets.earning_icon} alt="earning_icon" className='w-16 h-16'/>
          <div>
            <p className='text-4xl font-semibold text-gray-800'>{currency}{dashboardData.totalEarnings}</p>
            <p className='text-xl text-gray-600'>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Enrollments Table */}
      <div className='w-full max-w-4xl mt-6'>
        <h2 className='text-3xl font-medium text-gray-800 pb-6'>Latest Enrollments</h2>
        <div className='overflow-x-auto rounded-lg bg-white border border-gray-200 shadow-lg'>
          <table className='min-w-full text-left'>
            <thead className='text-gray-900 border-b border-gray-200 bg-blue-100'>
              <tr>
                <th className='px-6 py-4 text-base font-semibold text-center hidden sm:table-cell'>#</th>
                <th className='px-6 py-4 text-base font-semibold'>Student Name</th>
                <th className='px-6 py-4 text-base font-semibold'>Course Title</th>
              </tr>
            </thead>
            <tbody className='text-base text-gray-600'>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-200 transition-all duration-200 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-200`}>
                  <td className='px-6 py-4 text-center hidden sm:table-cell'>{index + 1}</td>
                  <td className='md:px-6 px-4 py-4 flex items-center space-x-3'>
                    <img src={item.student.imageUrl} alt="Profile" className='w-12 h-12 rounded-full border-2 border-gray-500'/>
                    <span className='truncate'>{item.student.name}</span>
                  </td>
                  <td className='px-6 py-4 truncate'>{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard
