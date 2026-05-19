import React, { useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const NavBar = () => {

    const Navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);

    const links = [
        { name: "Home", path: "/" },
        { name: "All Doctors", path: "/doctors" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        Navigate('/login');
    };

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/90 py-4 text-sm backdrop-blur'>

        <img className='w-40 cursor-pointer' src={assets.logo} alt="logo" onClick={()=>Navigate('/')}  />

        <ul className="hidden md:flex items-center gap-1 font-medium">
            {links.map(link => (
                <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `rounded-full px-4 py-2 transition ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                </li>
            ))}
        </ul>

        <div className='flex items-center'>
            {
                token && userData
                ? <div className='group relative flex cursor-pointer items-center gap-2'>
                    <img className='h-10 w-10 rounded-full border-2 border-blue-100 object-cover' src={userData.image || assets.profile_pic} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute right-0 top-0 hidden pt-12 text-base group-hover:block z-20'>
                        <div className='flex w-48 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg'>
                            <p onClick={()=>{Navigate('/profile')}} className='rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600'>My Profile</p>
                            <p onClick={()=>{Navigate('/my-appointments')}} className='rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600'>My Appointments</p>
                            <p onClick={logout} className='rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50'>Logout</p>
                        </div>
                    </div>
                </div>
                : <button onClick={()=>Navigate('/login')} className='rounded-full bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700'>Create Account</button>
            }
        </div>
    </header>
  )
}

export default NavBar
