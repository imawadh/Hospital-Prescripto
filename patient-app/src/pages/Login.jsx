import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { HeartPulseIcon } from '../components/Icons'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const isSignUp = state === 'Sign Up'

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'

  return (
    <div className='flex min-h-[78vh] items-center justify-center py-10'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={onSubmit}
          className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60'
        >
          <div className='mb-7 text-center'>
            <span className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-300/40'>
              <HeartPulseIcon className='h-7 w-7' />
            </span>
            <h1 className='text-2xl font-bold text-slate-800'>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className='mt-1 text-sm text-slate-400'>
              Please {isSignUp ? 'sign up' : 'sign in'} to book your
              appointments
            </p>
          </div>

          {isSignUp && (
            <div className='mb-4'>
              <label className='mb-1.5 block text-sm font-medium text-slate-600'>
                Full Name
              </label>
              <input
                type='text'
                placeholder='John Doe'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
                required
              />
            </div>
          )}

          <div className='mb-4'>
            <label className='mb-1.5 block text-sm font-medium text-slate-600'>
              Email Address
            </label>
            <input
              type='email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              required
            />
          </div>

          <div className='mb-6'>
            <label className='mb-1.5 block text-sm font-medium text-slate-600'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${field} pr-16`}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95'
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <p className='mt-5 text-center text-sm text-slate-500'>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => setState(isSignUp ? 'Sign In' : 'Sign Up')}
              className='cursor-pointer font-semibold text-blue-600 hover:underline'
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
