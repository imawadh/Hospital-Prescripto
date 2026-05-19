import React from 'react'
import { Routes, Route } from 'react-router-dom'
import  Home  from '../pages/Home'
import Doctors from '../pages/Doctors'
import  Login  from '../pages/Login'
import About from '../pages/About'
import Contact from '../pages/Contact'
import MyAppointments from '../pages/MyAppointments'
import MyProfile from '../pages/MyProfile'
import Appointments from '../pages/Appointments'
import Privacy from '../pages/Privacy'


const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/doctors" element={<Doctors/>}></Route>
            <Route path="/doctors/:speciality" element={<Doctors/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/profile" element={<MyProfile/>}></Route>
            <Route path="/my-appointments" element={<MyAppointments/>}></Route>
            <Route path="/my-appointments/:docId" element={<Appointments/>}></Route>
            <Route path="/privacy" element={<Privacy/>}></Route>

        </Routes>
    </div>
  )
}

export default AppRoutes