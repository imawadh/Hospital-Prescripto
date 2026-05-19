import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const filtered = speciality
    ? doctors.filter((d) => d.speciality === speciality)
    : doctors

  const toggle = (spec) => {
    navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)
  }

  return (
    <div className='py-10'>
      <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>
        Our Doctors
      </h1>
      <p className='mt-1 text-sm text-slate-500'>
        Browse our specialists and book your appointment.
      </p>

      <div className='mt-8 flex flex-col gap-8 lg:flex-row'>
        {/* Speciality filter */}
        <aside className='lg:w-60 lg:shrink-0'>
          <p className='mb-3 hidden text-xs font-semibold uppercase tracking-wider text-slate-400 lg:block'>
            Filter by speciality
          </p>
          <div className='flex flex-wrap gap-2 lg:flex-col'>
            {specialities.map((spec) => (
              <button
                key={spec}
                onClick={() => toggle(spec)}
                className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition ${
                  speciality === spec
                    ? 'border-blue-200 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </aside>

        {/* Doctor grid */}
        <div className='flex-1'>
          <p className='mb-4 text-sm text-slate-400'>
            {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
            {speciality ? ` in ${speciality}` : ''}
          </p>

          {filtered.length === 0 ? (
            <div className='rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-sm text-slate-400'>
              No doctors found for this speciality.
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
              {filtered.map((item) => (
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
        </div>
      </div>
    </div>
  )
}

export default Doctors
