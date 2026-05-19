import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const months = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatSlotDate = (slotDate) => {
  // slotDate format: DD_M_YYYY
  const [day, month, year] = slotDate.split('_');
  return `${day} ${months[Number(month)]} ${year}`;
};

const MyAppointments = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const payAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/pay-appointment',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-slate-800">My Appointments</h2>
      <p className="mt-1 text-sm text-slate-500">
        Manage your booked appointments below.
      </p>

      {appointments.length === 0 && (
        <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-400">
          You have no appointments yet.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {appointments.map((item) => (
          <div
            key={item._id}
            className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row"
          >
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="h-36 w-36 rounded-xl bg-blue-50 object-cover"
            />

            <div className="flex-1 text-sm text-slate-500">
              <p className="text-base font-semibold text-slate-800">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="mt-2 font-medium text-slate-600">Address</p>
              <p className="text-xs">{item.docData.address?.line1}</p>
              <p className="text-xs">{item.docData.address?.line2}</p>
              <p className="mt-2">
                <span className="font-medium text-slate-600">
                  Date &amp; Time:
                </span>{' '}
                {formatSlotDate(item.slotDate)} | {item.slotTime}
              </p>
              <p className="mt-1">
                <span className="font-medium text-slate-600">Fee:</span>{' '}
                {currencySymbol}
                {item.amount}
              </p>
            </div>

            <div className="flex min-w-44 flex-col justify-center gap-2">
              {item.cancelled ? (
                <span className="rounded-lg border border-red-200 bg-red-50 py-2 text-center text-sm font-medium text-red-500">
                  Appointment Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="rounded-lg border border-green-200 bg-green-50 py-2 text-center text-sm font-medium text-green-600">
                  Completed
                </span>
              ) : (
                <>
                  {item.payment ? (
                    <span className="rounded-lg bg-slate-100 py-2 text-center text-sm font-medium text-slate-600">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => payAppointment(item._id)}
                      className="rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      Pay Online
                    </button>
                  )}
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
