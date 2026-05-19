import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { formatSlotDate } from '../utils/format'
import { CheckIcon, CloseIcon, TrashIcon } from '../components/Icons'

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

const Person = ({ data, ring }) => (
  <div className='flex items-center gap-2.5'>
    <img
      src={data?.image}
      alt=''
      className={`h-9 w-9 rounded-full border bg-slate-100 object-cover ${ring}`}
    />
    <span className='font-medium text-slate-800'>{data?.name}</span>
  </div>
)

const AllAppointments = () => {
  const {
    appointments,
    getAllAppointments,
    cancelAppointment,
    updateAppointment,
    deleteAppointment,
    currencySymbol,
  } = useContext(AdminContext)

  useEffect(() => {
    getAllAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDelete = (id) => {
    if (window.confirm('Permanently delete this appointment?')) {
      deleteAppointment(id)
    }
  }

  const Actions = ({ item }) => (
    <div className='flex flex-wrap gap-2'>
      {!item.cancelled && !item.isCompleted && (
        <>
          <button
            onClick={() =>
              updateAppointment({
                appointmentId: item._id,
                isCompleted: true,
              })
            }
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
        </>
      )}
      <button
        onClick={() =>
          updateAppointment({
            appointmentId: item._id,
            payment: !item.payment,
          })
        }
        className='rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
      >
        {item.payment ? 'Mark Unpaid' : 'Mark Paid'}
      </button>
      <button
        onClick={() => onDelete(item._id)}
        title='Delete'
        className='flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100'
      >
        <TrashIcon className='h-4 w-4' />
      </button>
    </div>
  )

  return (
    <div>
      <div className='mb-6 flex items-center gap-3'>
        <div>
          <h1 className='text-xl font-bold text-slate-800'>Appointments</h1>
          <p className='text-sm text-slate-400'>
            Every booking across the hospital
          </p>
        </div>
        <span className='ml-auto rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600'>
          {appointments.length} total
        </span>
      </div>

      {appointments.length === 0 && (
        <div className='rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-400'>
          No appointments found.
        </div>
      )}

      {/* Desktop table */}
      {appointments.length > 0 && (
        <div className='hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block'>
          <table className='w-full text-left text-sm'>
            <thead className='border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
              <tr>
                <th className='px-5 py-3 font-semibold'>Patient</th>
                <th className='px-5 py-3 font-semibold'>Doctor</th>
                <th className='px-5 py-3 font-semibold'>Date &amp; Time</th>
                <th className='px-5 py-3 font-semibold'>Fees</th>
                <th className='px-5 py-3 font-semibold'>Status</th>
                <th className='px-5 py-3 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-slate-50 transition last:border-0 hover:bg-slate-50'
                >
                  <td className='px-5 py-3'>
                    <Person data={item.userData} ring='border-slate-200' />
                  </td>
                  <td className='px-5 py-3'>
                    <Person data={item.docData} ring='border-blue-100' />
                  </td>
                  <td className='px-5 py-3 text-slate-600'>
                    {formatSlotDate(item.slotDate)}
                    <span className='text-slate-400'> · {item.slotTime}</span>
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

      {/* Mobile / tablet cards */}
      <div className='flex flex-col gap-3 lg:hidden'>
        {appointments.map((item) => (
          <div
            key={item._id}
            className='rounded-2xl border border-slate-200 bg-white p-4'
          >
            <div className='flex items-center justify-between'>
              <Person data={item.userData} ring='border-slate-200' />
              <StatusBadge item={item} />
            </div>
            <div className='mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-sm text-slate-600'>
              <img
                src={item.docData?.image}
                alt=''
                className='h-7 w-7 rounded-full border border-blue-100 object-cover'
              />
              <span>{item.docData?.name}</span>
            </div>
            <p className='mt-2 text-sm text-slate-500'>
              {formatSlotDate(item.slotDate)} · {item.slotTime}
              <span className='ml-2 font-semibold text-slate-700'>
                {currencySymbol}
                {item.amount}
              </span>
            </p>
            <div className='mt-3'>
              <Actions item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
