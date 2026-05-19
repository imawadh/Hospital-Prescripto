import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const features = [
  {
    title: 'Efficiency',
    text: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
  },
  {
    title: 'Convenience',
    text: 'Access to a network of trusted healthcare professionals near you.',
  },
  {
    title: 'Reliability',
    text: 'Verified doctors and dependable booking you can count on.',
  },
  {
    title: 'Quality',
    text: 'Personalised care recommendations to keep you healthy.',
  },
]

const About = () => {
  return (
    <div className="py-8">
      {/* Heading */}
      <h1 className="text-center text-2xl font-semibold text-slate-800 sm:text-3xl">
        About Us
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
        Connecting patients with trusted doctors, simply and reliably.
      </p>

      {/* About Section */}
      <section className="mt-10 flex flex-col items-center gap-10 md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_image}
            alt="About"
            className="w-full rounded-2xl object-cover"
          />
        </div>

        <div className="w-full space-y-4 text-sm leading-relaxed text-slate-600 md:w-1/2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet sit
            enim sunt optio esse qui, sed fuga eaque assumenda nihil
            consequuntur deserunt beatae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            voluptas nostrum nisi perspiciatis, aspernatur magnam voluptates
            numquam.
          </p>
          <h3 className="pt-2 text-lg font-semibold text-slate-800">
            Our Vision
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            nisi adipisci odio odit, perferendis quidem ipsum. Temporibus quod
            itaque veritatis ut corporis perferendis qui est deserunt.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md"
            >
              <h3 className="mb-2 font-semibold text-slate-800">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
