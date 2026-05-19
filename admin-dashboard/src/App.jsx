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
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-4 sm:p-6'>
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
        </main>
      </div>
    </div>
  )
}

export default App
