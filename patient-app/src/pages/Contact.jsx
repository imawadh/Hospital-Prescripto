import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets_frontend/assets'
import { PhoneIcon, MailIcon, MapPinIcon } from '../components/Icons'

const infoCards = [
  {
    Icon: MapPinIcon,
    title: 'Our Office',
    lines: ['17th Cross, Richmond Circle,', 'Ring Road, London'],
  },
  { Icon: PhoneIcon, title: 'Phone', lines: ['+91 7985000241'] },
  { Icon: MailIcon, title: 'Email', lines: ['info1@gmail.com'] },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    toast.success("Thanks for reaching out! We'll get back to you soon.")
    setForm({ name: '', email: '', message: '' })
  }

  const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'

  return (
    <div className='py-10'>
      <div className='text-center'>
        <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
          Contact
        </p>
        <h1 className='mt-2 text-2xl font-bold text-slate-800 sm:text-3xl'>
          Get in touch with us
        </h1>
        <p className='mx-auto mt-3 max-w-xl text-sm text-slate-500'>
          Have a question or feedback? We&apos;d love to hear from you.
        </p>
      </div>

      <div className='mt-10 grid gap-8 lg:grid-cols-2'>
        {/* Left — image + info */}
        <div>
          <img
            src={assets.contact_image}
            alt='Contact Prescripto'
            className='w-full rounded-3xl object-cover shadow-sm'
          />
          <div className='mt-6 grid gap-3 sm:grid-cols-3'>
            {infoCards.map(({ Icon, title, lines }) => (
              <div
                key={title}
                className='rounded-2xl border border-slate-200 bg-white p-4'
              >
                <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
                  <Icon className='h-5 w-5' />
                </span>
                <p className='mt-3 text-sm font-semibold text-slate-800'>
                  {title}
                </p>
                {lines.map((line) => (
                  <p key={line} className='text-xs leading-relaxed text-slate-500'>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={onSubmit}
          className='rounded-3xl border border-slate-200 bg-white p-6 sm:p-8'
        >
          <h2 className='text-lg font-semibold text-slate-800'>
            Send us a message
          </h2>
          <p className='mt-1 text-sm text-slate-400'>
            We typically reply within one business day.
          </p>

          <div className='mt-5 space-y-4'>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-slate-600'>
                Full Name
              </label>
              <input
                type='text'
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder='John Doe'
                className={field}
              />
            </div>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-slate-600'>
                Email Address
              </label>
              <input
                type='email'
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder='you@example.com'
                className={field}
              />
            </div>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-slate-600'>
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder='How can we help?'
                className={`${field} resize-none`}
              />
            </div>
          </div>

          <button
            type='submit'
            className='mt-5 w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-95'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
