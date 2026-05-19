import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddDoctor from './pages/AddDoctor'
import DoctorsList from './pages/DoctorsList'
import EditDoctor from './pages/EditDoctor'
import AllAppointments from './pages/AllAppointments'
import PatientsList from './pages/PatientsList'
import EditPatient from './pages/EditPatient'

const App = () => {
  const { aToken } = useContext(AdminContext)

  if (!aToken) {
    return <Login />
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-800'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 px-4 py-6 sm:px-8'>
          <div className='mx-auto max-w-7xl'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctors' element={<DoctorsList />} />
              <Route path='/doctors/:id/edit' element={<EditDoctor />} />
              <Route path='/appointments' element={<AllAppointments />} />
              <Route path='/patients' element={<PatientsList />} />
              <Route path='/patients/:id/edit' element={<EditPatient />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
