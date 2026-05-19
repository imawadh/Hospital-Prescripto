import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { logout } = useContext(DoctorContext)

  return (
    <header className='flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex items-center gap-2'>
        <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white'>
          D
        </span>
        <div className='leading-tight'>
          <p className='text-sm font-semibold text-slate-800'>
            Doctor Panel
          </p>
          <p className='text-xs text-slate-400'>Hospital Management</p>
        </div>
      </div>
      <button
        onClick={logout}
        className='rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar
