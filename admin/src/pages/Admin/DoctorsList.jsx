import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors, removeDoctor, editDoctor } = useContext(AdminContext)

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(null)

  // Form States
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('')
  const [about, setAbout] = useState('')
  const [fees, setFees] = useState('')
  const [available, setAvailable] = useState(false)
  const [docImg, setDocImg] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const openModal = (doctor) => {
    setCurrentDoctor(doctor)
    setName(doctor.name)
    setSpeciality(doctor.speciality)
    setDegree(doctor.degree)
    setExperience(doctor.experience)
    setAbout(doctor.about)
    setFees(doctor.fees)
    setAvailable(doctor.available)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentDoctor(null)
    setDocImg(null)
    setImagePreview('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDocImg(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('docId', currentDoctor._id)
    formData.append('name', name)
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append('experience', experience)
    formData.append('about', about)
    formData.append('fees', fees)
    formData.append('available', available)
    if (docImg) {
      formData.append('image', docImg)
    }

    const success = await editDoctor(formData)
    if (success) {
      closeModal()
    }
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll w-full relative'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group flex flex-col justify-between' key={index}>
            <div>
              <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 w-full object-cover aspect-square' src={item.image} alt={item.name} />
              <div className='p-4'>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
            <div className='p-4 pt-0 flex flex-col gap-3 text-sm'>
              <div className='flex items-center gap-1'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p className='text-[#5C5C5C]'>Available</p>
              </div>
              <div className='flex items-center justify-between w-full gap-2 border-t pt-2'>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal(item)
                  }}
                  className='text-primary hover:text-white font-medium text-xs border border-primary hover:bg-primary rounded px-3 py-1 transition-all duration-300 flex-1 text-center'
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if(confirm("Are you sure you want to remove this doctor?")) {
                      removeDoctor(item._id) 
                    }
                  }} 
                  className='text-red-500 hover:text-white font-medium text-xs border border-red-200 hover:border-red-500 hover:bg-red-500 rounded px-3 py-1 transition-all duration-300 flex-1 text-center'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Doctor Modal Overlay */}
      {isModalOpen && currentDoctor && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-all duration-300'>
          <div className='bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative'>
            
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b pb-3 mb-4'>
              <h2 className='text-lg font-semibold text-gray-800'>Edit Doctor Profile</h2>
              <button 
                onClick={closeModal} 
                className='text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none'
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 text-left'>
              
              {/* Image Upload Area */}
              <div className='flex items-center gap-4 mb-2'>
                <div className='relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary bg-gray-50 flex-shrink-0'>
                  <img 
                    src={imagePreview || currentDoctor.image} 
                    alt="Doctor preview" 
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs font-semibold text-gray-500'>Profile Photo</span>
                  <input 
                    type="file" 
                    onChange={handleImageChange}
                    accept="image/*"
                    className='text-xs text-gray-500 file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90 cursor-pointer'
                  />
                </div>
              </div>

              {/* Form Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-semibold text-gray-600'>Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-semibold text-gray-600'>Specialty</label>
                  <select 
                    value={speciality} 
                    onChange={(e) => setSpeciality(e.target.value)} 
                    required 
                    className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
                  >
                    {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-semibold text-gray-600'>Degree</label>
                  <input 
                    type="text" 
                    value={degree} 
                    onChange={(e) => setDegree(e.target.value)} 
                    required 
                    className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs font-semibold text-gray-600'>Experience</label>
                  <select 
                    value={experience} 
                    onChange={(e) => setExperience(e.target.value)} 
                    required 
                    className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
                  >
                    {Array.from({ length: 30 }, (_, i) => `${i + 1} Year${i > 0 ? 's' : ''}`).map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-1 sm:col-span-2'>
                  <label className='text-xs font-semibold text-gray-600'>Fees (₹ / $)</label>
                  <input 
                    type="number" 
                    value={fees} 
                    onChange={(e) => setFees(e.target.value)} 
                    required 
                    className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
                  />
                </div>
                <div className='flex flex-col gap-1 sm:col-span-2'>
                  <label className='text-xs font-semibold text-gray-600'>About / Biography</label>
                  <textarea 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)} 
                    required 
                    rows={3} 
                    className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary resize-none'
                  />
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <input 
                    type="checkbox" 
                    id="available" 
                    checked={available} 
                    onChange={(e) => setAvailable(e.target.checked)} 
                    className='rounded text-primary border-gray-300 focus:ring-primary'
                  />
                  <label htmlFor="available" className='text-xs font-semibold text-gray-600 cursor-pointer'>Is Available for Booking</label>
                </div>
              </div>

              {/* Modal Footer / Actions */}
              <div className='flex items-center justify-end gap-2 mt-4 pt-3 border-t'>
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className='px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded hover:bg-gray-50 transition-all duration-300'
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className='px-5 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-opacity-95 shadow-sm transition-all duration-300'
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorsList