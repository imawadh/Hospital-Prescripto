import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const Navigate = useNavigate();

  return (
    <div className="my-16 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-500 px-6 text-white md:flex-row md:px-14">

      {/* Left Side */}
      <section className="w-full py-10 text-center md:w-1/2 md:py-14 md:text-left">
        <p className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          Book Appointment <br /> With 100+ Trusted Doctors
        </p>

        <button
          onClick={() => { Navigate("/login"); scrollTo(0, 0); }}
          className="mt-7 rounded-full bg-white px-8 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:scale-105"
        >
          Create Account
        </button>
      </section>

      {/* Right Side */}
      <section className="hidden w-full justify-end md:flex md:w-1/2">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="h-auto w-full max-w-xs self-end"
        />
      </section>

    </div>
  )
}

export default Banner
