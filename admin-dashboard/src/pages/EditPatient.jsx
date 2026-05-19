import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const EditPatient = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { users, getAllUsers, updateUser } = useContext(AdminContext)

  const [form, setForm] = useState(null)
  const [loadedId, setLoadedId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (users.length === 0) getAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Populate the form from the patient record once it is available
  const user = users.find((u) => u._id === id)
  if (user && loadedId !== id) {
    setLoadedId(id)
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      gender: user.gender || 'Not Selected',
      dob: user.dob || 'Not Selected',
      line1: user.address?.line1 || '',
      line2: user.address?.line2 || '',
    })
  }

  if (!form) {
    return (
      <div className='flex h-64 items-center justify-center text-sm text-slate-400'>
        Loading patient...
      </div>
    )
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const ok = await updateUser({
      userId: id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      dob: form.dob,
      address: JSON.stringify({ line1: form.line1, line2: form.line2 }),
    })
    setLoading(false)
    if (ok) navigate('/patients')
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'
  const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600'

  return (
    <div>
      <h1 className='text-xl font-bold text-slate-800'>Edit Patient</h1>
      <p className='mb-6 text-sm text-slate-400'>
        Update this patient&apos;s account details
      </p>

      <form
        onSubmit={onSubmit}
        className='max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-7'
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label className={labelCls}>Name</label>
            <input
              name='name'
              value={form.name}
              onChange={onChange}
              required
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              name='email'
              type='email'
              value={form.email}
              onChange={onChange}
              required
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input
              name='phone'
              value={form.phone}
              onChange={onChange}
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Gender</label>
            <select
              name='gender'
              value={form.gender}
              onChange={onChange}
              className={field}
            >
              <option value='Not Selected'>Not Selected</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Date of birth</label>
            <input
              name='dob'
              type='date'
              value={form.dob === 'Not Selected' ? '' : form.dob}
              onChange={onChange}
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Address line 1</label>
            <input
              name='line1'
              value={form.line1}
              onChange={onChange}
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Address line 2</label>
            <input
              name='line2'
              value={form.line2}
              onChange={onChange}
              className={field}
            />
          </div>
        </div>

        <div className='mt-6 flex gap-3 border-t border-slate-100 pt-5'>
          <button
            type='submit'
            disabled={loading}
            className='rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95 disabled:opacity-60'
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/patients')}
            className='rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPatient
