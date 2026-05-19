import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext"

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold text-slate-800 md:text-3xl">
        Top Doctors to Book
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.slice(0, 8).map((item) => (
          <DoctorCard
            onClick={() => { navigate(`/my-appointments/${item._id}`); scrollTo(0, 0); }}
            item={item}
            key={item._id}
          />
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
        className="mt-10 rounded-full bg-blue-50 px-8 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
      >
        See all Doctors
      </button>
    </div>
  )
}

const DoctorCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
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
}

export default TopDoctors
