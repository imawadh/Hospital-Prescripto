import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { EditIcon, TrashIcon } from '../components/Icons'

const PatientsList = () => {
  const { users, getAllUsers, deleteUser } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDelete = (user) => {
    if (window.confirm(`Delete patient ${user.name}? This cannot be undone.`)) {
      deleteUser(user._id)
    }
  }

  const Actions = ({ user }) => (
    <div className='flex gap-2'>
      <button
        onClick={() => navigate(`/patients/${user._id}/edit`)}
        title='Edit'
        className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100'
      >
        <EditIcon className='h-4 w-4' />
      </button>
      <button
        onClick={() => onDelete(user)}
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
          <h1 className='text-xl font-bold text-slate-800'>Patients</h1>
          <p className='text-sm text-slate-400'>Registered patient accounts</p>
        </div>
        <span className='ml-auto rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600'>
          {users.length} total
        </span>
      </div>

      {users.length === 0 && (
        <div className='rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-400'>
          No patients registered yet.
        </div>
      )}

      {/* Desktop table */}
      {users.length > 0 && (
        <div className='hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white md:block'>
          <table className='w-full text-left text-sm'>
            <thead className='border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
              <tr>
                <th className='px-5 py-3 font-semibold'>Patient</th>
                <th className='px-5 py-3 font-semibold'>Email</th>
                <th className='px-5 py-3 font-semibold'>Phone</th>
                <th className='px-5 py-3 font-semibold'>Gender</th>
                <th className='px-5 py-3 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className='border-b border-slate-50 transition last:border-0 hover:bg-slate-50'
                >
                  <td className='px-5 py-3'>
                    <div className='flex items-center gap-2.5'>
                      <img
                        src={user.image}
                        alt=''
                        className='h-9 w-9 rounded-full border border-slate-200 bg-slate-100 object-cover'
                      />
                      <span className='font-medium text-slate-800'>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-5 py-3 text-slate-600'>{user.email}</td>
                  <td className='px-5 py-3 text-slate-600'>{user.phone}</td>
                  <td className='px-5 py-3 text-slate-600'>{user.gender}</td>
                  <td className='px-5 py-3'>
                    <Actions user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile cards */}
      <div className='flex flex-col gap-3 md:hidden'>
        {users.map((user) => (
          <div
            key={user._id}
            className='rounded-2xl border border-slate-200 bg-white p-4'
          >
            <div className='flex items-center gap-3'>
              <img
                src={user.image}
                alt=''
                className='h-11 w-11 rounded-full border border-slate-200 bg-slate-100 object-cover'
              />
              <div className='min-w-0 flex-1'>
                <p className='truncate font-semibold text-slate-800'>
                  {user.name}
                </p>
                <p className='truncate text-xs text-slate-400'>{user.email}</p>
              </div>
              <Actions user={user} />
            </div>
            <div className='mt-3 flex gap-4 border-t border-slate-100 pt-3 text-sm text-slate-500'>
              <span>{user.phone}</span>
              <span>{user.gender}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientsList
