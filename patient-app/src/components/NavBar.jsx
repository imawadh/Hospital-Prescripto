import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { MenuIcon, CloseIcon } from './Icons'

const links = [
  { name: 'Home', path: '/' },
  { name: 'All Doctors', path: '/doctors' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const NavBar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setMenuOpen(false)
    navigate('/login')
  }

  const go = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6'>
        <img
          src={assets.logo}
          alt='Prescripto'
          onClick={() => navigate('/')}
          className='w-36 cursor-pointer sm:w-40'
        />

        {/* Desktop nav */}
        <nav className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          {token && userData ? (
            <div className='group relative hidden cursor-pointer items-center gap-2 md:flex'>
              <img
                src={userData.image || assets.profile_pic}
                alt=''
                className='h-9 w-9 rounded-full border-2 border-blue-100 object-cover'
              />
              <span className='text-sm font-medium text-slate-700'>
                {userData.name?.split(' ')[0]}
              </span>
              <div className='absolute right-0 top-full hidden pt-3 group-hover:block'>
                <div className='flex w-52 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70'>
                  <button
                    onClick={() => navigate('/profile')}
                    className='rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600'
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className='rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600'
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={logout}
                    className='rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50'
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='hidden rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95 md:block'
            >
              Create Account
            </button>
          )}

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label='Toggle menu'
            className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 md:hidden'
          >
            {menuOpen ? (
              <CloseIcon className='h-5 w-5' />
            ) : (
              <MenuIcon className='h-5 w-5' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className='border-t border-slate-200 bg-white px-4 py-3 md:hidden'>
          <nav className='flex flex-col gap-1'>
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className='my-2 border-t border-slate-100' />
            {token && userData ? (
              <>
                <button
                  onClick={() => go('/profile')}
                  className='rounded-xl px-4 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100'
                >
                  My Profile
                </button>
                <button
                  onClick={() => go('/my-appointments')}
                  className='rounded-xl px-4 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100'
                >
                  My Appointments
                </button>
                <button
                  onClick={logout}
                  className='rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50'
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => go('/login')}
                className='rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white'
              >
                Create Account
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default NavBar
