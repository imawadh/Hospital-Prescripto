import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import {
  ClockIcon,
  CalendarIcon,
  ShieldIcon,
  HeartPulseIcon,
} from '../components/Icons'

const features = [
  {
    Icon: ClockIcon,
    title: 'Efficiency',
    text: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
  },
  {
    Icon: CalendarIcon,
    title: 'Convenience',
    text: 'Access a network of trusted healthcare professionals near you.',
  },
  {
    Icon: ShieldIcon,
    title: 'Reliability',
    text: 'Verified doctors and dependable booking you can always count on.',
  },
  {
    Icon: HeartPulseIcon,
    title: 'Quality Care',
    text: 'Personalised recommendations to help you stay healthy year-round.',
  },
]

const About = () => {
  return (
    <div className='py-10'>
      <div className='text-center'>
        <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
          About Us
        </p>
        <h1 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
          Connecting patients with trusted doctors
        </h1>
        <p className='mx-auto mt-3 max-w-xl text-sm text-slate-500'>
          Simply, reliably, and all in one place.
        </p>
      </div>

      <section className='mt-12 flex flex-col items-center gap-10 md:flex-row'>
        <div className='w-full md:w-1/2'>
          <img
            src={assets.about_image}
            alt='About Prescripto'
            className='w-full rounded-3xl object-cover shadow-sm'
          />
        </div>

        <div className='w-full space-y-4 text-sm leading-relaxed text-slate-600 md:w-1/2'>
          <p>
            Welcome to Prescripto, your trusted partner in managing healthcare
            needs conveniently and efficiently. We understand the challenges
            people face when booking a doctor&apos;s appointment and keeping
            track of their health records.
          </p>
          <p>
            Prescripto brings together a network of verified doctors across
            specialities so you can find the right care, compare options, and
            book a slot — all from a single, easy-to-use platform.
          </p>
          <h3 className='pt-2 text-lg font-semibold text-slate-800'>
            Our Vision
          </h3>
          <p>
            Our vision is to create a seamless healthcare experience for every
            patient — bridging the gap between people and the doctors they need,
            making quality care accessible whenever it matters most.
          </p>
        </div>
      </section>

      <section className='mt-16'>
        <h2 className='text-xl font-bold text-slate-800 sm:text-2xl'>
          Why <span className='text-blue-600'>Choose Us</span>
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map(({ Icon, title, text }) => (
            <div
              key={title}
              className='rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
                <Icon className='h-6 w-6' />
              </span>
              <h3 className='mt-4 font-semibold text-slate-800'>{title}</h3>
              <p className='mt-1.5 text-sm leading-relaxed text-slate-500'>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
