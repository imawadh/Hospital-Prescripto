import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/appointments', label: 'Appointments', icon: '📅' },
  { to: '/add-doctor', label: 'Add Doctor', icon: '➕' },
  { to: '/doctors', label: 'Doctors', icon: '🩺' },
  { to: '/patients', label: 'Patients', icon: '👥' },
]

const Sidebar = () => {
  return (
    <aside className='min-h-[calc(100vh-57px)] w-16 shrink-0 border-r border-slate-200 bg-white sm:w-60'>
      <nav className='flex flex-col gap-1 py-4'>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-medium transition sm:px-6 ${
                isActive
                  ? 'border-r-4 border-blue-600 bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <span className='text-lg'>{link.icon}</span>
            <span className='hidden sm:inline'>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
