import React from 'react'

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
    <div className="py-8">
      <h1 className="text-center text-2xl font-semibold text-slate-800 sm:text-3xl">
        Privacy <span className="text-blue-600">Policy</span>
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
        Your privacy matters to us. Here&apos;s how we handle your information.
      </p>

      <div className="mx-auto mt-10 max-w-3xl space-y-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h2 className="font-semibold text-slate-800">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Privacy
