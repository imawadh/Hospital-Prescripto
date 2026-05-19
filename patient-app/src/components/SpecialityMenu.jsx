import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id='speciality' className='py-16 sm:py-20'>
      <div className='text-center'>
        <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
          Specialities
        </p>
        <h2 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
          Find by Speciality
        </h2>
        <p className='mx-auto mt-3 max-w-xl text-sm text-slate-500'>
          Choose a speciality and browse our trusted, verified doctors ready to
          help you.
        </p>
      </div>

      <div className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
        {specialityData.map((item) => (
          <Link
            key={item.speciality}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className='group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60'
          >
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-50 to-indigo-50 transition group-hover:from-blue-100 group-hover:to-indigo-100'>
              <img
                src={item.image}
                alt={item.speciality}
                className='h-12 w-12 object-contain'
              />
            </div>
            <p className='mt-3 text-center text-sm font-semibold text-slate-700'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu
