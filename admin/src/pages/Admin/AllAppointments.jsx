import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments, completeAppointment } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  
  const [filterState, setFilterState] = useState('All') // 'All', 'Active', 'Completed', 'Cancelled'

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const filteredAppointments = appointments.filter(item => {
    if (filterState === 'All') return true;
    if (filterState === 'Active') return !item.cancelled && !item.isCompleted;
    if (filterState === 'Completed') return item.isCompleted;
    if (filterState === 'Cancelled') return item.cancelled;
    return true;
  })

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      {/* Filter Tabs */}
      <div className='flex flex-wrap gap-2 mb-4'>
        {['All', 'Active', 'Completed', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterState(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
              filterState === status
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'Active' ? 'Active / Upcoming' : status}
          </button>
        ))}
      </div>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {filteredAppointments.map((item, index) => (
          <div className='max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:p-4 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            
            {/* Mobile Header & Action */}
            <div className='max-sm:flex justify-between items-center sm:hidden w-full border-b pb-2 mb-1'>
              <span className='font-semibold text-gray-800'>Appointment #{index + 1}</span>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-semibold'>{item.refunded ? 'Cancelled & Refunded' : 'Cancelled'}</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-semibold'>Completed</p>
              ) : (
                <div className='flex items-center gap-3'>
                  <img onClick={() => completeAppointment(item._id)} className='w-6 cursor-pointer hover:scale-110 transition-all' src={assets.tick_icon} alt="Mark as done" title="Mark as Done" />
                  <img onClick={() => cancelAppointment(item._id)} className='w-6 cursor-pointer hover:scale-110 transition-all' src={assets.cancel_icon} alt="Cancel" title="Cancel Appointment" />
                </div>
              )}
            </div>

            {/* Patient Info */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Patient:</span>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p className='font-medium text-gray-700'>{item.userData.name}</p>
              </div>
            </div>

            {/* Age Info */}
            <div className='flex items-center justify-between w-full sm:w-auto max-sm:flex sm:hidden'>
              <span className='text-xs font-medium text-gray-400 uppercase'>Age:</span>
              <p>{calculateAge(item.userData.dob)}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Date & Time:</span>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            </div>

            {/* Doctor Info */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Doctor:</span>
              <div className='flex items-center gap-2'>
                <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p className='font-medium text-gray-700'>{item.docData.name}</p>
              </div>
            </div>

            {/* Fees */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Fees:</span>
              <p className='font-medium text-gray-800'>{currency}{item.amount}</p>
            </div>

            {/* Desktop Action */}
            <div className='max-sm:hidden'>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-semibold'>{item.refunded ? 'Cancelled & Refunded' : 'Cancelled'}</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-semibold'>Completed</p>
              ) : (
                <div className='flex items-center gap-3'>
                  <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.tick_icon} alt="Mark as done" title="Mark as Done" />
                  <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.cancel_icon} alt="Cancel" title="Cancel Appointment" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments