import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendUrl, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    setDocInfo(doctors.find((doc) => doc._id === docId) || null);
  }, [doctors, docId]);

  // Build 7 days of 30-minute slots, skipping ones already booked
  useEffect(() => {
    if (!docInfo) return;

    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isBooked =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      return toast.warn('Please select a time slot');
    }

    // Resolve the exact slot the user picked so the date matches the time
    const selectedSlot = docSlots[slotIndex]?.find(
      (slot) => slot.time === slotTime
    );
    if (!selectedSlot) {
      return toast.warn('Please select a time slot');
    }

    try {
      const date = selectedSlot.datetime;
      const slotDate = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  if (!docInfo) {
    return <p className="py-10 text-center text-slate-400">Loading doctor...</p>;
  }

  return (
    <div className="py-8">
      <DoctorDetails doctor={docInfo} currencySymbol={currencySymbol} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-800">Booking Slots</h3>
        <p className="mt-1 text-sm text-slate-400">
          Select a day and time that works for you.
        </p>

        {/* Day selector */}
        <div className="mt-5 flex flex-wrap gap-3">
          {docSlots.map((daySlots, index) => {
            const date =
              daySlots[0]?.datetime ||
              new Date(new Date().setDate(new Date().getDate() + index));
            return (
              <button
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`flex flex-col items-center rounded-xl border px-5 py-3 text-sm font-medium transition
                  ${
                    slotIndex === index
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                  }`}
              >
                <span>{daysOfWeek[date.getDay()]}</span>
                <span className="text-xs opacity-80">{date.getDate()}</span>
              </button>
            );
          })}
        </div>

        {/* Time selector */}
        <div className="mt-5 flex flex-wrap gap-3">
          {docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
            docSlots[slotIndex].map((slot, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(slot.time)}
                className={`rounded-full border px-5 py-2 text-sm transition
                  ${
                    slotTime === slot.time
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                  }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No slots available for this day.
            </p>
          )}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-6 w-full rounded-full bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700 md:w-64"
        >
          Book an Appointment
        </button>
      </div>

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  );
};

const DoctorDetails = ({ doctor, currencySymbol }) => (
  <div className="flex flex-col gap-6 md:flex-row">
    <div className="shrink-0">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-64 w-full rounded-2xl bg-blue-50 object-cover md:w-64"
      />
    </div>

    <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-semibold text-slate-800">{doctor.name}</h3>

      <p className="text-sm text-slate-500">
        {doctor.degree} · {doctor.speciality}
        <span className="ml-2 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
          {doctor.experience}
        </span>
      </p>

      <div className="mt-2">
        <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700">
          About
          <img src={assets.info_icon} alt="info" className="h-4 w-4" />
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {doctor.about}
        </p>
      </div>

      <p className="mt-2 text-sm font-medium text-slate-600">
        Appointment fee:{' '}
        <span className="text-lg font-semibold text-slate-900">
          {currencySymbol}
          {doctor.fees}
        </span>
      </p>
    </div>
  </div>
);

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const related = doctors.filter(
    (item) => item.speciality === speciality && item._id !== docId
  );

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-center text-2xl font-semibold text-slate-800">
        Related Doctors
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/my-appointments/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="overflow-hidden bg-blue-50">
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                ></span>
                <p
                  className={`text-xs font-medium ${
                    item.available ? 'text-green-600' : 'text-slate-400'
                  }`}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </p>
              </div>
              <p className="font-semibold text-slate-800">{item.name}</p>
              <p className="text-sm text-slate-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
