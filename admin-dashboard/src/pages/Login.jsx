import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'

const Login = () => {
  const { login } = useContext(AdminContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await login(email, password)
    setLoading(false)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-100 px-4'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'
      >
        <div className='mb-6 text-center'>
          <span className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white'>
            H
          </span>
          <h1 className='text-xl font-semibold text-slate-800'>
            Admin Login
          </h1>
          <p className='text-sm text-slate-400'>
            Sign in to manage the hospital
          </p>
        </div>

        <label className='mb-1 block text-sm font-medium text-slate-600'>
          Email
        </label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
        />

        <label className='mb-1 block text-sm font-medium text-slate-600'>
          Password
        </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='mb-6 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60'
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
