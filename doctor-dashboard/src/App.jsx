import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DoctorContext } from './context/DoctorContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'

const App = () => {
  const { dToken } = useContext(DoctorContext)

  if (!dToken) {
    return <Login />
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-4 sm:p-6'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
