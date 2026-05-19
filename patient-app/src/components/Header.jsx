import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { ArrowRightIcon, StarIcon } from './Icons'

const Header = () => {
  const navigate = useNavigate()

  return (
    <section className='relative mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-600 to-indigo-700 text-white'>
      {/* Decorative glow */}
      <div className='pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10' />
      <div className='pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-white/5' />

      <div className='relative flex flex-col items-center gap-8 px-6 py-12 md:flex-row md:px-12 md:py-16'>
        <div className='w-full text-center md:w-1/2 md:text-left'>
          <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-300' />
            Trusted by 50,000+ patients
          </span>

          <h1 className='mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl'>
            Book appointments
            <br className='hidden sm:block' /> with trusted doctors
          </h1>

          <p className='mx-auto mt-4 max-w-md text-sm leading-relaxed text-blue-100 md:mx-0'>
            Browse our extensive list of verified doctors, compare
            specialities, and schedule your visit in just a few clicks.
          </p>

          <div className='mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start'>
            <button
              onClick={() => {
                navigate('/doctors')
                scrollTo(0, 0)
              }}
              className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-900/20 transition hover:scale-[1.03] sm:w-auto'
            >
              Find a Doctor <ArrowRightIcon className='h-4 w-4' />
            </button>
            <a
              href='#speciality'
              className='inline-flex w-full items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto'
            >
              Browse Specialities
            </a>
          </div>

          <div className='mt-8 flex items-center justify-center gap-3 md:justify-start'>
            <img src={assets.group_profiles} alt='' className='w-20' />
            <div className='text-left'>
              <div className='flex text-amber-300'>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className='h-3.5 w-3.5' />
                ))}
              </div>
              <p className='text-xs text-blue-100'>
                Rated 4.9/5 by our patients
              </p>
            </div>
          </div>
        </div>

        <div className='flex w-full justify-center md:w-1/2 md:justify-end'>
          <img
            src={assets.header_img}
            alt='Doctors'
            className='h-auto w-full max-w-sm self-end drop-shadow-2xl md:max-w-md'
          />
        </div>
      </div>
    </section>
  )
}

export default Header
