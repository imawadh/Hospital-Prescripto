import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const PatientsList = () => {
  const { users, getAllUsers, deleteUser } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers()
  }, [])

  const onDelete = (user) => {
    if (window.confirm(`Delete patient ${user.name}? This cannot be undone.`)) {
      deleteUser(user._id)
    }
  }

  return (
    <div>
      <h1 className='mb-5 text-xl font-semibold text-slate-800'>
        Patients ({users.length})
      </h1>

      <div className='overflow-x-auto rounded-xl border border-slate-200 bg-white'>
        <table className='w-full min-w-[720px] text-left text-sm'>
          <thead className='border-b border-slate-200 bg-slate-50 text-slate-500'>
            <tr>
              <th className='px-4 py-3 font-medium'>Patient</th>
              <th className='px-4 py-3 font-medium'>Email</th>
              <th className='px-4 py-3 font-medium'>Phone</th>
              <th className='px-4 py-3 font-medium'>Gender</th>
              <th className='px-4 py-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className='border-b border-slate-100 last:border-0'
              >
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    <img
                      src={user.image}
                      alt=''
                      className='h-8 w-8 rounded-full bg-slate-100 object-cover'
                    />
                    <span className='text-slate-700'>{user.name}</span>
                  </div>
                </td>
                <td className='px-4 py-3 text-slate-600'>{user.email}</td>
                <td className='px-4 py-3 text-slate-600'>{user.phone}</td>
                <td className='px-4 py-3 text-slate-600'>{user.gender}</td>
                <td className='px-4 py-3'>
                  <div className='flex gap-1.5'>
                    <button
                      onClick={() => navigate(`/patients/${user._id}/edit`)}
                      className='rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className='rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className='px-4 py-5 text-sm text-slate-400'>
            No patients registered yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default PatientsList
