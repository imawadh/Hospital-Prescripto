import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { formatSlotDate } from '../utils/format'

const StatCard = ({ label, value, icon, color }) => (
  <div className='flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5'>
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl ${color}`}
    >
      {icon}
    </span>
    <div>
      <p className='text-2xl font-semibold text-slate-800'>{value}</p>
      <p className='text-sm text-slate-400'>{label}</p>
    </div>
  </div>
)

const Dashboard = () => {
  const { dashData, getDashData, cancelAppointment } =
    useContext(AdminContext)

  useEffect(() => {
    getDashData()
  }, [])

  if (!dashData) {
    return <p className='text-slate-400'>Loading dashboard...</p>
  }

  return (
    <div>
      <h1 className='mb-5 text-xl font-semibold text-slate-800'>Dashboard</h1>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard
          label='Doctors'
          value={dashData.doctors}
          icon='🩺'
          color='bg-blue-100'
        />
        <StatCard
          label='Appointments'
          value={dashData.appointments}
          icon='📅'
          color='bg-green-100'
        />
        <StatCard
          label='Patients'
          value={dashData.patients}
          icon='👥'
          color='bg-amber-100'
        />
      </div>

      <div className='mt-6 rounded-xl border border-slate-200 bg-white'>
        <p className='border-b border-slate-200 px-5 py-3 font-semibold text-slate-700'>
          Latest Appointments
        </p>
        {dashData.latestAppointments?.length === 0 && (
          <p className='px-5 py-4 text-sm text-slate-400'>
            No appointments yet.
          </p>
        )}
        {dashData.latestAppointments?.map((item) => (
          <div
            key={item._id}
            className='flex items-center justify-between border-b border-slate-100 px-5 py-3 last:border-0'
          >
            <div className='flex items-center gap-3'>
              <img
                src={item.docData?.image}
                alt=''
                className='h-10 w-10 rounded-full bg-slate-100 object-cover'
              />
              <div>
                <p className='text-sm font-medium text-slate-800'>
                  {item.docData?.name}
                </p>
                <p className='text-xs text-slate-400'>
                  {formatSlotDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>
            {item.cancelled ? (
              <span className='text-xs font-medium text-red-500'>
                Cancelled
              </span>
            ) : item.isCompleted ? (
              <span className='text-xs font-medium text-green-600'>
                Completed
              </span>
            ) : (
              <button
                onClick={() => cancelAppointment(item._id)}
                className='rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50'
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
