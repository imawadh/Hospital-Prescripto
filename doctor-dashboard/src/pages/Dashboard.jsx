import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { formatSlotDate } from '../utils/format'
import {
  WalletIcon,
  ClipboardIcon,
  UsersIcon,
  CheckIcon,
  CloseIcon,
} from '../components/Icons'

const StatCard = ({ label, value, Icon, tint }) => (
  <div className='flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/70'>
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-xl ${tint}`}
    >
      <Icon className='h-6 w-6' />
    </span>
    <div>
      <p className='text-2xl font-bold text-slate-800'>{value}</p>
      <p className='text-sm text-slate-400'>{label}</p>
    </div>
  </div>
)

const Dashboard = () => {
  const {
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
    currencySymbol,
  } = useContext(DoctorContext)

  useEffect(() => {
    getDashData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!dashData) {
    return (
      <div className='flex h-64 items-center justify-center text-sm text-slate-400'>
        Loading dashboard...
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-xl font-bold text-slate-800'>Dashboard</h1>
      <p className='mb-6 text-sm text-slate-400'>Overview of your practice</p>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard
          label='Total Earnings'
          value={`${currencySymbol}${dashData.earnings}`}
          Icon={WalletIcon}
          tint='bg-emerald-100 text-emerald-600'
        />
        <StatCard
          label='Appointments'
          value={dashData.appointments}
          Icon={ClipboardIcon}
          tint='bg-blue-100 text-blue-600'
        />
        <StatCard
          label='Patients'
          value={dashData.patients}
          Icon={UsersIcon}
          tint='bg-amber-100 text-amber-600'
        />
      </div>

      <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white'>
        <div className='flex items-center gap-2 border-b border-slate-100 px-5 py-4'>
          <span className='h-4 w-1 rounded-full bg-blue-600' />
          <p className='font-semibold text-slate-700'>Latest Appointments</p>
        </div>

        {dashData.latestAppointments?.length === 0 && (
          <p className='px-5 py-10 text-center text-sm text-slate-400'>
            No appointments yet.
          </p>
        )}

        {dashData.latestAppointments?.map((item) => (
          <div
            key={item._id}
            className='flex items-center justify-between gap-3 border-b border-slate-50 px-5 py-3.5 transition last:border-0 hover:bg-slate-50'
          >
            <div className='flex min-w-0 items-center gap-3'>
              <img
                src={item.userData?.image}
                alt=''
                className='h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-slate-100 object-cover'
              />
              <div className='min-w-0'>
                <p className='truncate text-sm font-semibold text-slate-800'>
                  {item.userData?.name}
                </p>
                <p className='text-xs text-slate-400'>
                  {formatSlotDate(item.slotDate)} · {item.slotTime}
                </p>
              </div>
            </div>

            {item.cancelled ? (
              <span className='shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500'>
                Cancelled
              </span>
            ) : item.isCompleted ? (
              <span className='shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600'>
                Completed
              </span>
            ) : (
              <div className='flex shrink-0 gap-2'>
                <button
                  onClick={() => completeAppointment(item._id)}
                  title='Mark complete'
                  className='flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100'
                >
                  <CheckIcon className='h-4 w-4' />
                </button>
                <button
                  onClick={() => cancelAppointment(item._id)}
                  title='Cancel'
                  className='flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100'
                >
                  <CloseIcon className='h-4 w-4' />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
