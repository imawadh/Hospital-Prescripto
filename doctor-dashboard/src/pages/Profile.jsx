import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'

const Profile = () => {
  const { profile, getProfile, updateProfile, currencySymbol } =
    useContext(DoctorContext)

  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState(null)
  const [loadedId, setLoadedId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buildForm = (p) => ({
    fees: p.fees,
    available: p.available,
    line1: p.address?.line1 || '',
    line2: p.address?.line2 || '',
  })

  // Populate the editable form once the profile is loaded.
  if (profile && loadedId !== profile._id) {
    setLoadedId(profile._id)
    setForm(buildForm(profile))
  }

  if (!profile || !form) {
    return (
      <div className='flex h-64 items-center justify-center text-sm text-slate-400'>
        Loading profile...
      </div>
    )
  }

  const onSave = async () => {
    setSaving(true)
    const ok = await updateProfile({
      fees: Number(form.fees),
      available: form.available,
      address: { line1: form.line1, line2: form.line2 },
    })
    setSaving(false)
    if (ok) setEdit(false)
  }

  const onCancel = () => {
    setForm(buildForm(profile))
    setEdit(false)
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'

  return (
    <div>
      <h1 className='text-xl font-bold text-slate-800'>My Profile</h1>
      <p className='mb-6 text-sm text-slate-400'>
        Your public details and consultation settings
      </p>

      <div className='max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white'>
        {/* Banner + identity */}
        <div className='h-24 bg-linear-to-r from-blue-600 to-indigo-600' />
        <div className='px-6 pb-6'>
          <div className='-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end'>
            <img
              src={profile.image}
              alt={profile.name}
              className='h-24 w-24 rounded-2xl border-4 border-white bg-blue-50 object-cover shadow-sm'
            />
            <div className='flex-1 pb-1'>
              <h2 className='text-lg font-bold text-slate-800'>
                {profile.name}
              </h2>
              <div className='mt-1 flex flex-wrap items-center gap-2'>
                <span className='rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600'>
                  {profile.speciality}
                </span>
                <span className='text-xs text-slate-400'>
                  {profile.degree} · {profile.experience} experience
                </span>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                (edit ? form.available : profile.available)
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {(edit ? form.available : profile.available)
                ? '● Available'
                : '○ Unavailable'}
            </span>
          </div>

          {/* Details */}
          <div className='mt-6 grid gap-5 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Email
              </p>
              <p className='mt-1 text-sm text-slate-700'>{profile.email}</p>
            </div>

            <div className='sm:col-span-2'>
              <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                About
              </p>
              <p className='mt-1 text-sm leading-relaxed text-slate-600'>
                {profile.about}
              </p>
            </div>

            <div>
              <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Appointment Fee
              </p>
              {edit ? (
                <input
                  type='number'
                  value={form.fees}
                  onChange={(e) => setForm({ ...form, fees: e.target.value })}
                  className={field}
                />
              ) : (
                <p className='text-sm font-semibold text-slate-800'>
                  {currencySymbol}
                  {profile.fees}
                </p>
              )}
            </div>

            <div>
              <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Availability
              </p>
              {edit ? (
                <button
                  type='button'
                  onClick={() =>
                    setForm({ ...form, available: !form.available })
                  }
                  className={`relative h-7 w-12 rounded-full transition ${
                    form.available ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      form.available ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              ) : (
                <p className='text-sm text-slate-700'>
                  {profile.available
                    ? 'Accepting appointments'
                    : 'Not accepting appointments'}
                </p>
              )}
            </div>

            <div className='sm:col-span-2'>
              <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Address
              </p>
              {edit ? (
                <div className='space-y-2'>
                  <input
                    value={form.line1}
                    onChange={(e) =>
                      setForm({ ...form, line1: e.target.value })
                    }
                    placeholder='Address line 1'
                    className={field}
                  />
                  <input
                    value={form.line2}
                    onChange={(e) =>
                      setForm({ ...form, line2: e.target.value })
                    }
                    placeholder='Address line 2'
                    className={field}
                  />
                </div>
              ) : (
                <p className='text-sm text-slate-600'>
                  {profile.address?.line1}
                  <br />
                  {profile.address?.line2}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='mt-7 flex gap-3 border-t border-slate-100 pt-5'>
            {edit ? (
              <>
                <button
                  onClick={onSave}
                  disabled={saving}
                  className='rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95 disabled:opacity-60'
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={onCancel}
                  className='rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className='rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95'
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
