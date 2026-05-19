import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, Link } from 'react-router-dom'
import { PhoneIcon, MailIcon, MapPinIcon } from './Icons'

const company = [
  { name: 'Home', path: '/' },
  { name: 'All Doctors', path: '/doctors' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy', path: '/privacy' },
]

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
]

const Footer = () => {
  return (
    <footer className='mt-20 border-t border-slate-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.3fr]'>
          <section>
            <img className='mb-4 w-40' src={assets.logo} alt='Prescripto' />
            <p className='max-w-sm text-sm leading-relaxed text-slate-500'>
              Book appointments with trusted doctors near you. Browse
              specialities, compare doctors, and schedule your visit
              hassle-free — all in one place.
            </p>
          </section>

          <section>
            <h3 className='mb-4 text-sm font-semibold text-slate-800'>
              Company
            </h3>
            <ul className='flex flex-col gap-2.5 text-sm text-slate-500'>
              {company.map((item) => (
                <li key={item.path}>
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
            <h3 className='mb-4 text-sm font-semibold text-slate-800'>
              Specialities
            </h3>
            <ul className='flex flex-col gap-2.5 text-sm text-slate-500'>
              {specialities.map((spec) => (
                <li key={spec}>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to={`/doctors/${spec}`}
                    className='transition hover:text-blue-600'
                  >
                    {spec}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className='mb-4 text-sm font-semibold text-slate-800'>
              Get in Touch
            </h3>
            <ul className='flex flex-col gap-3 text-sm text-slate-500'>
              <li className='flex items-center gap-2.5'>
                <PhoneIcon className='h-4 w-4 text-blue-600' />
                +91 7985000241
              </li>
              <li className='flex items-center gap-2.5'>
                <MailIcon className='h-4 w-4 text-blue-600' />
                info1@gmail.com
              </li>
              <li className='flex items-start gap-2.5'>
                <MapPinIcon className='mt-0.5 h-4 w-4 shrink-0 text-blue-600' />
                17th Cross, Richmond Circle, Ring Road, London
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className='border-t border-slate-100'>
        <p className='mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-400 sm:px-6'>
          &copy; {new Date().getFullYear()} Prescripto. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
