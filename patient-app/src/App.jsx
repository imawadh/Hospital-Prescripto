import React from 'react'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50 text-slate-700'>
      <NavBar />
      <main className='flex-1'>
        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6'>
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
