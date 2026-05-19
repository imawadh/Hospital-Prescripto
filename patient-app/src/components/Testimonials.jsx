import React from 'react'
import { StarIcon, QuoteIcon } from './Icons'

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Patient',
    initials: 'AS',
    color: 'bg-blue-100 text-blue-600',
    text: 'Booking an appointment took less than a minute. The doctor was professional and right on time — a brilliant experience overall.',
  },
  {
    name: 'Rahul Verma',
    role: 'Patient',
    initials: 'RV',
    color: 'bg-emerald-100 text-emerald-600',
    text: 'I love how easy it is to find specialists near me. The dashboard keeps every appointment neatly organised in one place.',
  },
  {
    name: 'Priya Nair',
    role: 'Patient',
    initials: 'PN',
    color: 'bg-amber-100 text-amber-600',
    text: 'Managing my whole family’s appointments through one account has been a real game changer. Highly recommend Prescripto.',
  },
]

const Testimonials = () => (
  <section className='py-16 sm:py-20'>
    <div className='text-center'>
      <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
        Testimonials
      </p>
      <h2 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
        What our patients say
      </h2>
      <p className='mx-auto mt-3 max-w-xl text-sm text-slate-500'>
        Real stories from people who booked their care through Prescripto.
      </p>
    </div>

    <div className='mt-10 grid gap-6 md:grid-cols-3'>
      {testimonials.map((t) => (
        <figure
          key={t.name}
          className='flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg hover:shadow-slate-200/70'
        >
          <QuoteIcon className='h-8 w-8 text-blue-100' />
          <div className='mt-2 flex text-amber-400'>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className='h-4 w-4' />
            ))}
          </div>
          <blockquote className='mt-3 flex-1 text-sm leading-relaxed text-slate-600'>
            &ldquo;{t.text}&rdquo;
          </blockquote>
          <figcaption className='mt-5 flex items-center gap-3 border-t border-slate-100 pt-4'>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
            >
              {t.initials}
            </span>
            <div>
              <p className='text-sm font-semibold text-slate-800'>{t.name}</p>
              <p className='text-xs text-slate-400'>{t.role}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
)

export default Testimonials
