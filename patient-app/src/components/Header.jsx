import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-500 px-6 text-white md:flex-row md:px-12">

      {/* Left Side */}
      <section className="w-full py-10 text-center md:w-1/2 md:py-16 md:text-left">
        <p className="text-3xl font-bold leading-tight md:text-4xl">
          Book Appointments <br /> with Trusted Doctors
        </p>

        <div className="mt-5 hidden items-center gap-4 lg:flex">
          <img src={assets.group_profiles} alt="" className="w-24" />
          <p className="text-sm text-blue-50">
            Simply browse through our extensive list of trusted doctors,
            and schedule your appointment hassle-free.
          </p>
        </div>

        <a href="#speciality">
          <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:scale-105">
            <span>Book Appointment</span>
            <img src={assets.arrow_icon} alt="arrow" className="h-3 w-3" />
          </button>
        </a>
      </section>

      {/* Right Side */}
      <section className="flex w-full justify-center md:w-1/2 md:justify-end">
        <img
          src={assets.header_img}
          alt="Header"
          className="h-auto w-full max-w-sm self-end md:max-w-md"
        />
      </section>

    </div>
  )
}

export default Header
