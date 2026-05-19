import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { LogoIcon, LogoutIcon } from './Icons'

const Navbar = () => {
  const { logout } = useContext(AdminContext)

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:px-6'>
      <div className='flex items-center gap-2.5'>
        <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-200'>
          <LogoIcon className='h-5 w-5' />
        </span>
        <div className='leading-tight'>
          <p className='text-sm font-bold text-slate-800'>Prescripto</p>
          <p className='text-[11px] font-medium uppercase tracking-wide text-slate-400'>
            Admin Panel
          </p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <span className='hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex'>
          <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
          Administrator
        </span>
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
