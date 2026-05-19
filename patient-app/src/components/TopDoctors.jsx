import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from './DoctorCard'
import { ArrowRightIcon } from './Icons'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='py-16 sm:py-20'>
      <div className='text-center'>
        <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
          Our Doctors
        </p>
        <h2 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
          Top Doctors to Book
        </h2>
        <p className='mx-auto mt-3 max-w-xl text-sm text-slate-500'>
          Meet some of our most-booked, highly-rated specialists.
        </p>
      </div>

      {doctors.length === 0 ? (
        <p className='mt-10 text-center text-sm text-slate-400'>
          Loading doctors...
        </p>
      ) : (
        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {doctors.slice(0, 8).map((item) => (
            <DoctorCard
              key={item._id}
              item={item}
              onClick={() => {
                navigate(`/my-appointments/${item._id}`)
                scrollTo(0, 0)
              }}
            />
          ))}
        </div>
      )}

      <div className='mt-10 text-center'>
        <button
          onClick={() => {
            navigate('/doctors')
            scrollTo(0, 0)
          }}
          className='inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700'
        >
          View all doctors <ArrowRightIcon className='h-4 w-4' />
        </button>
      </div>
    </section>
  )
}

export default TopDoctors
