import React, { useState } from 'react'
import { ChevronDownIcon } from './Icons'

const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'Browse doctors by speciality, open a doctor’s profile, pick an available date and time slot, and confirm. You only need a free account to complete a booking.',
  },
  {
    q: 'Is creating an account free?',
    a: 'Yes. Creating a Prescripto account is completely free. You only pay the consultation fee shown on each doctor’s profile.',
  },
  {
    q: 'Can I cancel or reschedule an appointment?',
    a: 'You can cancel any appointment from the "My Appointments" page. The doctor’s slot is released automatically so other patients can book it.',
  },
  {
    q: 'How do I pay for a consultation?',
    a: 'You can pay online through the app or choose to pay in cash at the clinic. Your payment status is always visible in your appointments list.',
  },
]

const FAQ = () => {
  const [open, setOpen] = useState(0)

  return (
    <section className='my-4 rounded-3xl border border-slate-200 bg-white px-6 py-14 sm:px-10 sm:py-16'>
      <div className='text-center'>
        <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
          FAQ
        </p>
        <h2 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
          Frequently asked questions
        </h2>
      </div>

      <div className='mx-auto mt-10 max-w-3xl divide-y divide-slate-100'>
        {faqs.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className='flex w-full items-center justify-between gap-4 py-4 text-left'
              >
                <span className='text-sm font-semibold text-slate-800'>
                  {item.q}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-blue-600 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className='pb-4 text-sm leading-relaxed text-slate-500'>
                  {item.a}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
