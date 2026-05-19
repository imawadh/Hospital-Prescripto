import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DoctorContext } from './context/DoctorContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'

const App = () => {
  const { dToken, getProfile } = useContext(DoctorContext)

  // Load the doctor's profile once signed in so the navbar can show it.
  useEffect(() => {
    if (dToken) getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken])

  if (!dToken) {
    return <Login />
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-800'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 px-4 py-6 sm:px-8'>
          <div className='mx-auto max-w-6xl'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/appointments' element={<Appointments />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
