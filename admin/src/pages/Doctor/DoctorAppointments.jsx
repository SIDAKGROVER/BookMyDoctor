import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  const [filterState, setFilterState] = useState('All') // 'All', 'Active', 'Completed', 'Cancelled'

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

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
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {filteredAppointments.map((item, index) => (
          <div className='max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:p-4 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            
            {/* Mobile Header & Action */}
            <div className='max-sm:flex justify-between items-center sm:hidden w-full border-b pb-2 mb-1'>
              <span className='font-semibold text-gray-800'>Appointment #{index + 1}</span>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex gap-1'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>

            {/* Patient Info */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Patient:</span>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p className='font-medium text-gray-700'>{item.userData.name}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Payment:</span>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>
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

            {/* Fees */}
            <div className='flex items-center gap-2 max-sm:justify-between w-full'>
              <span className='sm:hidden text-xs font-medium text-gray-400 uppercase'>Fees:</span>
              <p className='font-medium text-gray-800'>{currency}{item.amount}</p>
            </div>

            {/* Desktop Action */}
            <div className='max-sm:hidden'>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex gap-1'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments