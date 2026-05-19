import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className="py-8">
      <h1 className="text-center text-2xl font-semibold text-slate-800 sm:text-3xl">
        Contact <span className="text-blue-600">Us</span>
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
        We&apos;d love to hear from you — reach out anytime.
      </p>

      <div className="mt-10 flex flex-col items-center gap-10 md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact"
            className="w-full rounded-2xl object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Our Office
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              17th Cross, Richmond Circle,<br />
              Ring Road, London
            </p>

            <h3 className="mt-5 text-lg font-semibold text-slate-800">
              Get in Touch
            </h3>
            <p className="mt-3 text-sm text-slate-500">Phone: +91 7985000241</p>
            <p className="text-sm text-slate-500">Email: info1@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
