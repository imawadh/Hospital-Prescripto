import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { LogoIcon } from '../components/Icons'

const Login = () => {
  const { login } = useContext(DoctorContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await login(email, password)
    setLoading(false)
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'

  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 px-4'>
      <div className='w-full max-w-sm'>
        <form
          onSubmit={onSubmit}
          className='rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-300/40 backdrop-blur'
        >
          <div className='mb-7 text-center'>
            <span className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-300/50'>
              <LogoIcon className='h-7 w-7' />
            </span>
            <h1 className='text-xl font-bold text-slate-800'>Doctor Login</h1>
            <p className='mt-1 text-sm text-slate-400'>
              Sign in to manage your appointments
            </p>
          </div>

          <label className='mb-1.5 block text-sm font-medium text-slate-600'>
            Email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@hospital.com'
            className={`${field} mb-4`}
          />

          <label className='mb-1.5 block text-sm font-medium text-slate-600'>
            Password
          </label>
          <div className='relative mb-6'>
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='••••••••'
              className={`${field} pr-16`}
            />
            <button
              type='button'
              onClick={() => setShowPwd(!showPwd)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700'
            >
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-300/40 transition hover:opacity-95 disabled:opacity-60'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className='mt-5 text-center text-xs text-slate-400'>
          Prescripto · Hospital Management System
        </p>
      </div>
    </div>
  )
}

export default Login
