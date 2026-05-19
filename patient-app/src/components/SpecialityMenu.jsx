import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center py-16 text-center">

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-slate-800 md:text-3xl">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-xl text-sm text-slate-500">
        Simply browse through our extensive list of trusted doctors and
        schedule your appointment hassle-free.
      </p>

      {/* Speciality List */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <img
                src={item.image}
                alt={item.speciality}
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default SpecialityMenu
