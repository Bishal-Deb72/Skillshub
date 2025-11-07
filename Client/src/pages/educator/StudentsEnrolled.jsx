import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../components/student/Loading';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function StudentsEnrolled() {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrollStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrollStudents();
    }
  }, [isEducator]);

  if (!enrolledStudents) return <Loading />;

  return (
    <div className='min-h-screen w-full p-4 pt-8 md:p-8'>
      <h1 className='text-xl md:text-2xl font-semibold text-gray-800 mb-4'>Enrolled Students</h1>
      
      {/* Desktop Table */}
      <div className='hidden md:block overflow-hidden rounded-lg bg-white border border-gray-200 shadow'>
        <table className='w-full'>
          <thead className='bg-gradient-to-r from-blue-100 to-blue-200'>
            <tr>
              <th className='px-6 py-3 font-semibold text-center'>#</th>
              <th className='px-6 py-3 font-semibold text-left'>Student Name</th>
              <th className='px-6 py-3 font-semibold text-left'>Course Title</th>
              <th className='px-6 py-3 font-semibold text-left'>Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr 
                key={index}
                className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
              >
                <td className='px-6 py-4 text-center text-gray-600'>{index + 1}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={item.student.imageUrl}
                      alt='Student'
                      className='w-10 h-10 rounded-full border-2 border-gray-300'
                    />
                    <span className='text-gray-800 font-medium'>{item.student.name}</span>
                  </div>
                </td>
                <td className='px-6 py-4 text-gray-700 truncate max-w-xs'>{item.courseTitle}</td>
                <td className='px-6 py-4 text-gray-600'>
                  {item.purchaseData ? new Date(item.purchaseData).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className='md:hidden space-y-4'>
        {enrolledStudents.map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-lg shadow border border-gray-200 p-4 hover:bg-gray-50'
          >
            <div className='flex items-start space-x-3'>
              <img
                src={item.student.imageUrl}
                alt='Student'
                className='w-12 h-12 rounded-full border-2 border-gray-300 flex-shrink-0'
              />
              <div className='flex-1'>
                <div className='flex justify-between items-start'>
                  <h3 className='font-medium text-gray-800'>{item.student.name}</h3>
                  <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                    #{index + 1}
                  </span>
                </div>
                <p className='text-sm text-gray-700 mt-1 truncate'>{item.courseTitle}</p>
                <p className='text-xs text-gray-500 mt-2'>
                  Enrolled: {item.purchaseData ? new Date(item.purchaseData).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsEnrolled;