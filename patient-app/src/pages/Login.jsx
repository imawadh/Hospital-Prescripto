import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const field =
    'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

  return (
    <div className="flex min-h-[75vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              +
            </span>
            <h2 className="text-2xl font-semibold text-slate-800">
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Please {state === 'Sign Up' ? 'create your account' : 'sign in'} to
              book appointments
            </p>
          </div>

          {state === 'Sign Up' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
                required
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${field} pr-16`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Sign In'}
          </button>

          {state === 'Sign Up' ? (
            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <span
                onClick={() => setState('Sign In')}
                className="cursor-pointer font-medium text-blue-600 hover:underline"
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="cursor-pointer font-medium text-blue-600 hover:underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
