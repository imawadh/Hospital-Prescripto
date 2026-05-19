import React from 'react'
import { ShieldIcon } from '../components/Icons'

const sections = [
  {
    title: 'Information We Collect',
    text: 'We collect details you provide when registering and booking appointments, such as your name, contact information, and medical preferences.',
  },
  {
    title: 'How We Use Your Information',
    text: 'Your information is used solely to manage appointments, connect you with doctors, and improve your experience on the platform.',
  },
  {
    title: 'Data Security',
    text: 'We apply industry-standard safeguards to protect your personal data against unauthorised access or disclosure.',
  },
  {
    title: 'Your Rights',
    text: 'You may review, update, or request deletion of your personal information at any time from your profile or by contacting us.',
  },
]

const Privacy = () => {
  return (
    <div className='py-10'>
      <div className='text-center'>
        <span className='mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600'>
          <ShieldIcon className='h-6 w-6' />
        </span>
        <h1 className='mt-4 text-2xl font-bold text-slate-800 sm:text-3xl'>
          Privacy <span className='text-blue-600'>Policy</span>
        </h1>
        <p className='mx-auto mt-3 max-w-xl text-sm text-slate-500'>
          Your privacy matters to us. Here&apos;s how we handle your
          information.
        </p>
      </div>

      <div className='mx-auto mt-10 max-w-3xl space-y-4'>
        {sections.map((s, i) => (
          <div
            key={s.title}
            className='flex gap-4 rounded-2xl border border-slate-200 bg-white p-6'
          >
            <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600'>
              {i + 1}
            </span>
            <div>
              <h2 className='font-semibold text-slate-800'>{s.title}</h2>
              <p className='mt-1.5 text-sm leading-relaxed text-slate-500'>
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Privacy
