import React from 'react'
import { SearchIcon, CalendarIcon, HeartPulseIcon } from './Icons'

const steps = [
  {
    Icon: SearchIcon,
    title: 'Find a Doctor',
    text: 'Browse by speciality and pick a verified doctor that fits your needs.',
  },
  {
    Icon: CalendarIcon,
    title: 'Book a Slot',
    text: 'Choose a date and time that works for you and confirm in seconds.',
  },
  {
    Icon: HeartPulseIcon,
    title: 'Get Care',
    text: 'Visit your doctor and manage every appointment from your dashboard.',
  },
]

const HowItWorks = () => (
  <section className='my-4 rounded-3xl border border-slate-200 bg-white px-6 py-14 sm:px-10 sm:py-16'>
    <div className='text-center'>
      <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
        How it works
      </p>
      <h2 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
        Book in 3 simple steps
      </h2>
    </div>

    <div className='relative mt-12 grid gap-10 md:grid-cols-3'>
      {/* Connector line */}
      <div className='absolute inset-x-12 top-7 hidden border-t-2 border-dashed border-blue-100 md:block' />

      {steps.map((step, i) => (
        <div
          key={step.title}
          className='relative flex flex-col items-center text-center'
        >
          <span className='relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'>
            <step.Icon className='h-7 w-7' />
            <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-xs font-bold text-white'>
              {i + 1}
            </span>
          </span>
          <h3 className='mt-4 font-semibold text-slate-800'>{step.title}</h3>
          <p className='mt-2 max-w-xs text-sm leading-relaxed text-slate-500'>
            {step.text}
          </p>
        </div>
      ))}
    </div>
  </section>
)

export default HowItWorks
