import React from 'react'
import { Outlet } from 'react-router-dom'
import Nervbar from '../../components/educator/Nervbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'


function Educator() {
  return (
    <div className='text-defau;t min-h-screen bg-white'>
      <Nervbar/>
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1'>
          {<Outlet/>}

        </div>
        
      </div>
      <Footer/>
    </div>
    
  )
}

export default Educator