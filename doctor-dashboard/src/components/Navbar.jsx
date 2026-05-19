import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { LogoIcon, LogoutIcon } from './Icons'

const Navbar = () => {
  const { logout, profile } = useContext(DoctorContext)

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:px-6'>
      <div className='flex items-center gap-2.5'>
        <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-200'>
          <LogoIcon className='h-5 w-5' />
        </span>
        <div className='leading-tight'>
          <p className='text-sm font-bold text-slate-800'>Prescripto</p>
          <p className='text-[11px] font-medium uppercase tracking-wide text-slate-400'>
            Doctor Panel
          </p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {profile && (
          <div className='flex items-center gap-2.5 border-r border-slate-200 pr-3'>
            <img
              src={profile.image}
              alt={profile.name}
              className='h-9 w-9 rounded-full border border-slate-200 object-cover'
            />
            <div className='hidden leading-tight sm:block'>
              <p className='text-sm font-semibold text-slate-700'>
                {profile.name}
              </p>
              <p className='text-[11px] text-slate-400'>{profile.speciality}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className='flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600'
        >
          <LogoutIcon className='h-4 w-4' />
          <span className='hidden sm:inline'>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
