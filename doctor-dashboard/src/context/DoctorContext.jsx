import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const currencySymbol = "$";

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profile, setProfile] = useState(false);

  const headers = { headers: { dtoken: dToken } };

  // ---- Auth ----
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("dToken", data.token);
        setDToken(data.token);
        toast.success("Logged in");
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("dToken");
    setDToken("");
    setAppointments([]);
    setDashData(false);
    setProfile(false);
  };

  // ---- Dashboard ----
  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/dashboard",
        headers
      );
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---- Appointments ----
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        headers
      );
      if (data.success) setAppointments(data.appointments.reverse());
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---- Profile ----
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/profile",
        headers
      );
      if (data.success) setProfile(data.profileData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const updateProfile = async (payload) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        payload,
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getProfile();
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const value = {
    backendUrl,
    currencySymbol,
    dToken,
    login,
    logout,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    getDashData,
    profile,
    getProfile,
    updateProfile,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
