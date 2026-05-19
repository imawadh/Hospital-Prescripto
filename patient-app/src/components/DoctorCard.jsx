import React from 'react'
import { VerifiedIcon } from './Icons'

// Shared doctor card used on the home page, the doctors listing, and the
// related-doctors strip on the booking page.
const DoctorCard = ({ item, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className='group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60'
  >
    <div className='relative overflow-hidden bg-linear-to-b from-blue-50 to-indigo-50'>
      <img
        src={item.image}
        alt={item.name}
        className='h-52 w-full object-cover transition duration-300 group-hover:scale-105'
      />
      <span
        className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur ${
          item.available ? 'bg-emerald-500/90' : 'bg-slate-400/90'
        }`}
      >
        <span className='h-1.5 w-1.5 rounded-full bg-white' />
        {item.available ? 'Available' : 'Unavailable'}
      </span>
    </div>
    <div className='p-4'>
      <div className='flex items-center gap-1.5'>
        <p className='truncate font-semibold text-slate-800'>{item.name}</p>
        <VerifiedIcon className='h-4 w-4 shrink-0 text-blue-500' />
      </div>
      <p className='mt-0.5 text-sm text-slate-500'>{item.speciality}</p>
      <span className='mt-3 inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white'>
        Book appointment →
      </span>
    </div>
  </button>
)

export default DoctorCard
