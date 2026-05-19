import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { ArrowRightIcon } from './Icons'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className='relative my-16 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 text-white'>
      <div className='pointer-events-none absolute -right-10 -top-12 h-52 w-52 rounded-full bg-white/10' />
      <div className='pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/5' />

      <div className='relative flex flex-col items-center gap-6 px-6 py-12 md:flex-row md:px-14 md:py-10'>
        <div className='w-full text-center md:w-3/5 md:text-left'>
          <h2 className='text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl'>
            Book your appointment
            <br className='hidden sm:block' /> with 100+ trusted doctors
          </h2>
          <p className='mx-auto mt-3 max-w-md text-sm text-blue-100 md:mx-0'>
            Create your free account today and take charge of your health.
          </p>
          <button
            onClick={() => {
              navigate('/login')
              scrollTo(0, 0)
            }}
            className='mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-900/20 transition hover:scale-[1.03]'
          >
            Create Account <ArrowRightIcon className='h-4 w-4' />
          </button>
        </div>

        <div className='hidden w-2/5 justify-end md:flex'>
          <img
            src={assets.appointment_img}
            alt=''
            className='h-auto w-full max-w-xs self-end'
          />
        </div>
      </div>
    </section>
  )
}

export default Banner
