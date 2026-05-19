import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { formatSlotDate, calcAge } from '../utils/format'
import { CheckIcon, CloseIcon } from '../components/Icons'

const StatusBadge = ({ item }) => {
  if (item.cancelled)
    return (
      <span className='rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500'>
        Cancelled
      </span>
    )
  if (item.isCompleted)
    return (
      <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600'>
        Completed
      </span>
    )
  return (
    <span className='rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600'>
      Pending
    </span>
  )
}

const PaymentBadge = ({ paid }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
      paid ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
    }`}
  >
    {paid ? 'Online' : 'Cash'}
  </span>
)

const Appointments = () => {
  const {
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    currencySymbol,
  } = useContext(DoctorContext)

  useEffect(() => {
    getAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Actions = ({ item }) =>
    !item.cancelled && !item.isCompleted ? (
      <div className='flex gap-2'>
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
    ) : (
      <span className='text-xs text-slate-300'>—</span>
    )

  return (
    <div>
      <div className='mb-6 flex items-center gap-3'>
        <div>
          <h1 className='text-xl font-bold text-slate-800'>Appointments</h1>
          <p className='text-sm text-slate-400'>
            Manage your patient appointments
          </p>
        </div>
        <span className='ml-auto rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600'>
          {appointments.length} total
        </span>
      </div>

      {appointments.length === 0 && (
        <div className='rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400'>
          No appointments found.
        </div>
      )}

      {/* Desktop table */}
      {appointments.length > 0 && (
        <div className='hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block'>
          <table className='w-full text-left text-sm'>
            <thead className='border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
              <tr>
                <th className='px-5 py-3 font-semibold'>Patient</th>
                <th className='px-5 py-3 font-semibold'>Age</th>
                <th className='px-5 py-3 font-semibold'>Date &amp; Time</th>
                <th className='px-5 py-3 font-semibold'>Payment</th>
                <th className='px-5 py-3 font-semibold'>Fees</th>
                <th className='px-5 py-3 font-semibold'>Status</th>
                <th className='px-5 py-3 font-semibold'>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-slate-50 transition last:border-0 hover:bg-slate-50'
                >
                  <td className='px-5 py-3'>
                    <div className='flex items-center gap-2.5'>
                      <img
                        src={item.userData?.image}
                        alt=''
                        className='h-9 w-9 rounded-full border border-slate-200 bg-slate-100 object-cover'
                      />
                      <span className='font-medium text-slate-800'>
                        {item.userData?.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-5 py-3 text-slate-600'>
                    {calcAge(item.userData?.dob)}
                  </td>
                  <td className='px-5 py-3 text-slate-600'>
                    {formatSlotDate(item.slotDate)}
                    <span className='text-slate-400'> · {item.slotTime}</span>
                  </td>
                  <td className='px-5 py-3'>
                    <PaymentBadge paid={item.payment} />
                  </td>
                  <td className='px-5 py-3 font-semibold text-slate-700'>
                    {currencySymbol}
                    {item.amount}
                  </td>
                  <td className='px-5 py-3'>
                    <StatusBadge item={item} />
                  </td>
                  <td className='px-5 py-3'>
                    <Actions item={item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile cards */}
      <div className='flex flex-col gap-3 md:hidden'>
        {appointments.map((item) => (
          <div
            key={item._id}
            className='rounded-2xl border border-slate-200 bg-white p-4'
          >
            <div className='flex items-center gap-3'>
              <img
                src={item.userData?.image}
                alt=''
                className='h-11 w-11 rounded-full border border-slate-200 bg-slate-100 object-cover'
              />
              <div className='min-w-0 flex-1'>
                <p className='truncate font-semibold text-slate-800'>
                  {item.userData?.name}
                </p>
                <p className='text-xs text-slate-400'>
                  Age {calcAge(item.userData?.dob)}
                </p>
              </div>
              <StatusBadge item={item} />
            </div>

            <div className='mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm'>
              <div>
                <p className='text-slate-600'>
                  {formatSlotDate(item.slotDate)} · {item.slotTime}
                </p>
                <p className='mt-1 flex items-center gap-2'>
                  <PaymentBadge paid={item.payment} />
                  <span className='font-semibold text-slate-700'>
                    {currencySymbol}
                    {item.amount}
                  </span>
                </p>
              </div>
              <Actions item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments
