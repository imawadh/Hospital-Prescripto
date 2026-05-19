import React from 'react'
import { NavLink } from 'react-router-dom'
import { GridIcon, CalendarIcon, UserIcon } from './Icons'

const links = [
  { to: '/', label: 'Dashboard', Icon: GridIcon, end: true },
  { to: '/appointments', label: 'Appointments', Icon: CalendarIcon },
  { to: '/profile', label: 'Profile', Icon: UserIcon },
]

const Sidebar = () => {
  return (
    <aside className='sticky top-[61px] h-[calc(100vh-61px)] w-16 shrink-0 border-r border-slate-200 bg-white sm:w-64'>
      <nav className='flex flex-col gap-1 p-3'>
        <p className='hidden px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:block'>
          Menu
        </p>
        {links.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`
            }
          >
            <Icon className='h-5 w-5 shrink-0' />
            <span className='hidden sm:inline'>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
