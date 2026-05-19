import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  return (
    <footer className='mt-10 border-t border-slate-200'>
      <div className='grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]'>

        <section>
          <img className='mb-4 w-40' src={assets.logo} alt="logo" />
          <p className='max-w-md text-sm leading-relaxed text-slate-500'>
            Book appointments with trusted doctors near you. Browse specialities,
            compare doctors, and schedule your visit hassle-free — all in one place.
          </p>
        </section>

        <section>
          <h3 className='mb-3 font-semibold text-slate-800'>Company</h3>
          <ul className='flex flex-col gap-2 text-sm text-slate-500'>
            {links.map((item, index) => (
              <li key={index}>
                <NavLink
                  onClick={() => scrollTo(0, 0)}
                  to={item.path}
                  className='transition hover:text-blue-600'
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className='mb-3 font-semibold text-slate-800'>Get in Touch</h3>
          <p className='text-sm text-slate-500'>+91 7985000241</p>
          <address className='text-sm not-italic text-slate-500'>info1@gmail.com</address>
        </section>

      </div>

      <div className='border-t border-slate-200 py-5 text-center text-sm text-slate-400'>
        &copy; {new Date().getFullYear()} Hospital Management. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
