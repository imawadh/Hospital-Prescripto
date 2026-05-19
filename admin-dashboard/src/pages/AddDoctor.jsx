import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { UploadIcon } from '../components/Icons'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const experiences = [
  '1 Year',
  '2 Years',
  '3 Years',
  '4 Years',
  '5 Years',
  '6 Years',
  '8 Years',
  '10 Years',
]

const emptyForm = {
  name: '',
  email: '',
  password: '',
  speciality: specialities[0],
  degree: '',
  experience: experiences[0],
  fees: '',
  about: '',
  line1: '',
  line2: '',
}

const AddDoctor = () => {
  const { addDoctor } = useContext(AdminContext)
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!image) {
      return toast.error('Please upload a doctor image')
    }
    const data = new FormData()
    data.append('image', image)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('password', form.password)
    data.append('speciality', form.speciality)
    data.append('degree', form.degree)
    data.append('experience', form.experience)
    data.append('about', form.about)
    data.append('fees', form.fees)
    data.append(
      'address',
      JSON.stringify({ line1: form.line1, line2: form.line2 })
    )

    setLoading(true)
    const ok = await addDoctor(data)
    setLoading(false)
    if (ok) {
      setForm(emptyForm)
      setImage(null)
      navigate('/doctors')
    }
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'
  const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600'

  return (
    <div>
      <h1 className='text-xl font-bold text-slate-800'>Add Doctor</h1>
      <p className='mb-6 text-sm text-slate-400'>
        Create a new doctor profile and login
      </p>

      <form
        onSubmit={onSubmit}
        className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-7'
      >
        <div className='mb-6 flex items-center gap-4'>
          <label className='cursor-pointer'>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=''
                className='h-20 w-20 rounded-2xl object-cover'
              />
            ) : (
              <div className='flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400'>
                <UploadIcon className='h-5 w-5' />
                <span className='text-[10px] font-medium'>Upload</span>
              </div>
            )}
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
              Click the tile to upload a JPG, PNG or WebP image.
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
            <label className={labelCls}>Password</label>
            <input
              name='password'
              type='password'
              value={form.password}
              onChange={onChange}
              required
              minLength={8}
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
            <select
              name='experience'
              value={form.experience}
              onChange={onChange}
              className={field}
            >
              {experiences.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
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
            <label className={labelCls}>Address line 1</label>
            <input
              name='line1'
              value={form.line1}
              onChange={onChange}
              required
              className={field}
            />
          </div>
          <div>
            <label className={labelCls}>Address line 2</label>
            <input
              name='line2'
              value={form.line2}
              onChange={onChange}
              required
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
            {loading ? 'Saving...' : 'Add Doctor'}
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

export default AddDoctor
