import React from 'react'
import {
  StethoscopeIcon,
  UsersIcon,
  HeartPulseIcon,
  ClockIcon,
} from './Icons'

const stats = [
  { Icon: StethoscopeIcon, value: '100+', label: 'Verified Doctors' },
  { Icon: UsersIcon, value: '50k+', label: 'Happy Patients' },
  { Icon: HeartPulseIcon, value: '15+', label: 'Specialities' },
  { Icon: ClockIcon, value: '24/7', label: 'Support' },
]

const Stats = () => (
  <div className='relative z-10 -mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5'>
    {stats.map(({ Icon, value, label }) => (
      <div
        key={label}
        className='rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm shadow-slate-200/60'
      >
        <span className='mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
          <Icon className='h-6 w-6' />
        </span>
        <p className='mt-3 text-2xl font-extrabold text-slate-800'>{value}</p>
        <p className='text-xs font-medium text-slate-500'>{label}</p>
      </div>
    ))}
  </div>
)

export default Stats
