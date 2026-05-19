import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { formatSlotDate } from '../utils/format'

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
  }, [])

  const onDelete = (id) => {
    if (window.confirm('Permanently delete this appointment?')) {
      deleteAppointment(id)
    }
  }

  const statusBadge = (item) => {
    if (item.cancelled)
      return (
        <span className='rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600'>
          Cancelled
        </span>
      )
    if (item.isCompleted)
      return (
        <span className='rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'>
          Completed
        </span>
      )
    return (
      <span className='rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700'>
        Pending
      </span>
    )
  }

  return (
    <div>
      <h1 className='mb-5 text-xl font-semibold text-slate-800'>
        Appointments ({appointments.length})
      </h1>

      <div className='overflow-x-auto rounded-xl border border-slate-200 bg-white'>
        <table className='w-full min-w-[860px] text-left text-sm'>
          <thead className='border-b border-slate-200 bg-slate-50 text-slate-500'>
            <tr>
              <th className='px-4 py-3 font-medium'>Patient</th>
              <th className='px-4 py-3 font-medium'>Doctor</th>
              <th className='px-4 py-3 font-medium'>Date &amp; Time</th>
              <th className='px-4 py-3 font-medium'>Fees</th>
              <th className='px-4 py-3 font-medium'>Status</th>
              <th className='px-4 py-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr
                key={item._id}
                className='border-b border-slate-100 last:border-0'
              >
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    <img
                      src={item.userData?.image}
                      alt=''
                      className='h-8 w-8 rounded-full bg-slate-100 object-cover'
                    />
                    <span className='text-slate-700'>
                      {item.userData?.name}
                    </span>
                  </div>
                </td>
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    <img
                      src={item.docData?.image}
                      alt=''
                      className='h-8 w-8 rounded-full bg-blue-50 object-cover'
                    />
                    <span className='text-slate-700'>
                      {item.docData?.name}
                    </span>
                  </div>
                </td>
                <td className='px-4 py-3 text-slate-600'>
                  {formatSlotDate(item.slotDate)} | {item.slotTime}
                </td>
                <td className='px-4 py-3 text-slate-600'>
                  {currencySymbol}
                  {item.amount}
                </td>
                <td className='px-4 py-3'>{statusBadge(item)}</td>
                <td className='px-4 py-3'>
                  <div className='flex flex-wrap gap-1.5'>
                    {!item.cancelled && !item.isCompleted && (
                      <>
                        <button
                          onClick={() =>
                            updateAppointment({
                              appointmentId: item._id,
                              isCompleted: true,
                            })
                          }
                          className='rounded-md border border-green-200 px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-50'
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className='rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50'
                        >
                          Cancel
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
                      className='rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50'
                    >
                      {item.payment ? 'Mark Unpaid' : 'Mark Paid'}
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className='rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <p className='px-4 py-5 text-sm text-slate-400'>
            No appointments found.
          </p>
        )}
      </div>
    </div>
  )
}

export default AllAppointments
