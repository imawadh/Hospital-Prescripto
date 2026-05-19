import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const DoctorsList = () => {
  const { doctors, getAllDoctors, changeAvailability, deleteDoctor, currencySymbol } =
    useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    getAllDoctors()
  }, [])

  const onDelete = (doc) => {
    if (window.confirm(`Delete Dr. ${doc.name}? This cannot be undone.`)) {
      deleteDoctor(doc._id)
    }
  }

  return (
    <div>
      <h1 className='mb-5 text-xl font-semibold text-slate-800'>
        Doctors ({doctors.length})
      </h1>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className='overflow-hidden rounded-xl border border-slate-200 bg-white'
          >
            <img
              src={doc.image}
              alt={doc.name}
              className='h-40 w-full bg-blue-50 object-cover'
            />
            <div className='p-4'>
              <p className='font-semibold text-slate-800'>{doc.name}</p>
              <p className='text-sm text-slate-400'>{doc.speciality}</p>
              <p className='mt-1 text-sm text-slate-500'>
                {currencySymbol}
                {doc.fees} fees
              </p>

              <label className='mt-3 flex items-center gap-2 text-sm text-slate-600'>
                <input
                  type='checkbox'
                  checked={doc.available}
                  onChange={() => changeAvailability(doc._id)}
                />
                {doc.available ? 'Available' : 'Unavailable'}
              </label>

              <div className='mt-3 flex gap-2'>
                <button
                  onClick={() => navigate(`/doctors/${doc._id}/edit`)}
                  className='flex-1 rounded-md bg-blue-600 py-1.5 text-xs font-medium text-white hover:bg-blue-700'
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(doc)}
                  className='flex-1 rounded-md border border-red-200 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <p className='text-sm text-slate-400'>No doctors added yet.</p>
      )}
    </div>
  )
}

export default DoctorsList
