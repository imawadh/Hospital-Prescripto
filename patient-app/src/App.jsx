import React from 'react'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar/>
      <AppRoutes/>
      <Footer/>
    </div>
  )
}

export default App