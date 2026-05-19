import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from "../context/AppContext"

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  // derive filtered doctors
  const filteredDoctors = speciality
    ? doctors.filter(doc => doc.speciality === speciality)
    : doctors

  const handleClick = (spec) => {
    if (speciality === spec) {
      navigate('/doctors') // deselect
    } else {
      navigate(`/doctors/${spec}`)
    }
  }

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ]

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold text-slate-800">Our Doctors</h1>
      <p className="mt-1 text-sm text-slate-500">
        Browse through our specialists and book your appointment.
      </p>

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        {/* Speciality filter */}
        <aside className="flex flex-row flex-wrap gap-2 md:w-56 md:flex-col">
          {specialities.map(spec => (
            <button
              key={spec}
              onClick={() => handleClick(spec)}
              className={`rounded-lg border px-4 py-2.5 text-left text-sm transition
                ${
                  speciality === spec
                    ? "border-blue-200 bg-blue-50 font-medium text-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
            >
              {spec}
            </button>
          ))}
        </aside>

        {/* Doctor grid */}
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map(item => (
            <DoctorCard
              key={item._id}
              item={item}
              onClick={() => { navigate(`/my-appointments/${item._id}`); scrollTo(0, 0); }}
            />
          ))}
          {filteredDoctors.length === 0 && (
            <p className="text-sm text-slate-400">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

const DoctorCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="overflow-hidden bg-blue-50">
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover transition group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            item.available ? "bg-green-500" : "bg-slate-300"
          }`}
        ></span>
        <p
          className={`text-xs font-medium ${
            item.available ? "text-green-600" : "text-slate-400"
          }`}
        >
          {item.available ? "Available" : "Not Available"}
        </p>
      </div>
      <p className="font-semibold text-slate-800">{item.name}</p>
      <p className="text-sm text-slate-500">{item.speciality}</p>
    </div>
  </div>
)

export default Doctors
