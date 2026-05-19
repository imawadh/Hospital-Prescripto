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

  // Populate the editable form once the profile is loaded
  if (profile && loadedId !== profile._id) {
    setLoadedId(profile._id)
    setForm({
      fees: profile.fees,
      available: profile.available,
      line1: profile.address?.line1 || '',
      line2: profile.address?.line2 || '',
    })
  }

  if (!profile || !form) {
    return <p className='text-slate-400'>Loading profile...</p>
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
    setForm({
      fees: profile.fees,
      available: profile.available,
      line1: profile.address?.line1 || '',
      line2: profile.address?.line2 || '',
    })
    setEdit(false)
  }

  const field =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500'

  return (
    <div>
      <h1 className='mb-5 text-xl font-semibold text-slate-800'>My Profile</h1>

      <div className='max-w-2xl rounded-xl border border-slate-200 bg-white p-6'>
        <div className='flex items-center gap-4'>
          <img
            src={profile.image}
            alt={profile.name}
            className='h-24 w-24 rounded-xl bg-blue-50 object-cover'
          />
          <div>
            <p className='text-lg font-semibold text-slate-800'>
              {profile.name}
            </p>
            <p className='text-sm text-slate-500'>
              {profile.degree} — {profile.speciality}
            </p>
            <p className='text-xs text-slate-400'>
              {profile.experience} experience
            </p>
          </div>
        </div>

        <div className='mt-5 space-y-3 text-sm'>
          <div>
            <p className='font-medium text-slate-600'>Email</p>
            <p className='text-slate-500'>{profile.email}</p>
          </div>

          <div>
            <p className='font-medium text-slate-600'>About</p>
            <p className='text-slate-500'>{profile.about}</p>
          </div>

          <div>
            <p className='mb-1 font-medium text-slate-600'>Appointment fee</p>
            {edit ? (
              <input
                type='number'
                value={form.fees}
                onChange={(e) => setForm({ ...form, fees: e.target.value })}
                className={field}
              />
            ) : (
              <p className='text-slate-500'>
                {currencySymbol}
                {profile.fees}
              </p>
            )}
          </div>

          <div>
            <p className='mb-1 font-medium text-slate-600'>Address</p>
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
              <p className='text-slate-500'>
                {profile.address?.line1}
                <br />
                {profile.address?.line2}
              </p>
            )}
          </div>

          <div>
            <label className='flex items-center gap-2 font-medium text-slate-600'>
              <input
                type='checkbox'
                checked={edit ? form.available : profile.available}
                disabled={!edit}
                onChange={(e) =>
                  setForm({ ...form, available: e.target.checked })
                }
              />
              Available for appointments
            </label>
          </div>
        </div>

        <div className='mt-6 flex gap-3'>
          {edit ? (
            <>
              <button
                onClick={onSave}
                disabled={saving}
                className='rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60'
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={onCancel}
                className='rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className='rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700'
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
