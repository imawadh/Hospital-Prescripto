import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { EditIcon, TrashIcon, PlusIcon } from '../components/Icons'

const DoctorsList = () => {
  const {
    doctors,
    getAllDoctors,
    changeAvailability,
    deleteDoctor,
    currencySymbol,
  } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    getAllDoctors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDelete = (doc) => {
    if (window.confirm(`Delete Dr. ${doc.name}? This cannot be undone.`)) {
      deleteDoctor(doc._id)
    }
  }

  return (
    <div>
      <div className='mb-6 flex flex-wrap items-center gap-3'>
        <div>
          <h1 className='text-xl font-bold text-slate-800'>Doctors</h1>
          <p className='text-sm text-slate-400'>
            Manage your medical team and availability
          </p>
        </div>
        <span className='rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600'>
          {doctors.length} total
        </span>
        <button
          onClick={() => navigate('/add-doctor')}
          className='ml-auto inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95'
        >
          <PlusIcon className='h-4 w-4' /> Add Doctor
        </button>
      </div>

      {doctors.length === 0 ? (
        <div className='rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-400'>
          No doctors added yet.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className='overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg hover:shadow-slate-200/70'
            >
              <div className='relative'>
                <img
                  src={doc.image}
                  alt={doc.name}
                  className='h-44 w-full bg-linear-to-b from-blue-50 to-indigo-50 object-cover'
                />
                <span
                  className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${
                    doc.available ? 'bg-emerald-500/90' : 'bg-slate-400/90'
                  }`}
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-white' />
                  {doc.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className='p-4'>
                <p className='truncate font-semibold text-slate-800'>
                  {doc.name}
                </p>
                <p className='text-sm text-slate-400'>{doc.speciality}</p>
                <p className='mt-2 inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600'>
                  {currencySymbol}
                  {doc.fees} consultation fee
                </p>

                <div className='mt-3 flex items-center justify-between border-t border-slate-100 pt-3'>
                  <span className='text-xs font-medium text-slate-500'>
                    Availability
                  </span>
                  <button
                    type='button'
                    onClick={() => changeAvailability(doc._id)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      doc.available ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                        doc.available ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className='mt-3 flex gap-2'>
                  <button
                    onClick={() => navigate(`/doctors/${doc._id}/edit`)}
                    className='flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition hover:bg-blue-700'
                  >
                    <EditIcon className='h-4 w-4' /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(doc)}
                    className='flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50'
                  >
                    <TrashIcon className='h-4 w-4' /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList
