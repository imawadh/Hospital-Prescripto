import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const EditDoctor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { doctors, getAllDoctors, updateDoctor } = useContext(AdminContext)

  const [form, setForm] = useState(null)
  const [loadedId, setLoadedId] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (doctors.length === 0) getAllDoctors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Populate the form from the doctor record once it is available
  const doc = doctors.find((d) => d._id === id)
  if (doc && loadedId !== id) {
    setLoadedId(id)
    setForm({
      name: doc.name,
      email: doc.email,
      password: '',
      speciality: doc.speciality,
      degree: doc.degree,
      experience: doc.experience,
      fees: doc.fees,
      about: doc.about,
      available: doc.available,
      line1: doc.address?.line1 || '',
      line2: doc.address?.line2 || '',
      image: doc.image,
    })
  }

  if (!form) {
    return (
      <div className='flex h-64 items-center justify-center text-sm text-slate-400'>
        Loading doctor...
      </div>
    )
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('docId', id)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('speciality', form.speciality)
    data.append('degree', form.degree)
    data.append('experience', form.experience)
    data.append('about', form.about)
    data.append('fees', form.fees)
    data.append('available', form.available)
    data.append(
      'address',
      JSON.stringify({ line1: form.line1, line2: form.line2 })
    )
    if (form.password) data.append('password', form.password)
    if (image) data.append('image', image)

    setLoading(true)
    const ok = await updateDoctor(data)
    setLoading(false)
    if (ok) navigate('/doctors')
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'
  const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600'

  return (
    <div>
      <h1 className='text-xl font-bold text-slate-800'>Edit Doctor</h1>
      <p className='mb-6 text-sm text-slate-400'>
        Update this doctor&apos;s profile details
      </p>

      <form
        onSubmit={onSubmit}
        className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-7'
      >
        <div className='mb-6 flex items-center gap-4'>
          <label className='cursor-pointer'>
            <img
              src={image ? URL.createObjectURL(image) : form.image}
              alt=''
              className='h-20 w-20 rounded-2xl bg-slate-100 object-cover'
            />
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <div>
            <p className='text-sm font-medium text-slate-700'>Doctor photo</p>
            <p className='text-xs text-slate-400'>
              Click the image to replace it.
            </p>
          </div>
        </div>

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
            <label className={labelCls}>
              New password{' '}
              <span className='text-slate-400'>(leave blank to keep)</span>
            </label>
            <input
              name='password'
              type='password'
              value={form.password}
              onChange={onChange}
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Speciality</label>
            <select
              name='speciality'
              value={form.speciality}
              onChange={onChange}
              className={field}
            >
              {specialities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Degree</label>
            <input
              name='degree'
              value={form.degree}
              onChange={onChange}
              required
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Experience</label>
            <input
              name='experience'
              value={form.experience}
              onChange={onChange}
              required
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Fees</label>
            <input
              name='fees'
              type='number'
              value={form.fees}
              onChange={onChange}
              required
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Availability</label>
            <select
              name='available'
              value={form.available}
              onChange={(e) =>
                setForm({ ...form, available: e.target.value === 'true' })
              }
              className={field}
            >
              <option value='true'>Available</option>
              <option value='false'>Unavailable</option>
            </select>
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

        <div className='mt-4'>
          <label className={labelCls}>About</label>
          <textarea
            name='about'
            value={form.about}
            onChange={onChange}
            required
            rows={4}
            className={`${field} resize-none`}
          />
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
            onClick={() => navigate('/doctors')}
            className='rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditDoctor
