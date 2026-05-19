import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // Strip any trailing slash so requests never produce a "//api/..." path.
  const backendUrl = (
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  ).replace(/\/+$/, "");
  const currencySymbol = "$";

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashData, setDashData] = useState(false);

  const headers = { headers: { atoken: aToken } };

  // ---- Auth ----
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
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
    localStorage.removeItem("aToken");
    setAToken("");
    setDoctors([]);
    setAppointments([]);
    setUsers([]);
    setDashData(false);
  };

  // ---- Dashboard ----
  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/dashboard",
        headers
      );
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---- Doctors ----
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        headers
      );
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const addDoctor = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        headers
      );
      if (data.success) {
        toast.success(data.message);
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const updateDoctor = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-doctor",
        formData,
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const deleteDoctor = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-doctor",
        { docId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---- Appointments ----
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointments",
        headers
      );
      if (data.success) setAppointments(data.appointments.reverse());
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const updateAppointment = async (payload) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-appointment",
        payload,
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-appointment",
        { appointmentId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---- Patients (users) ----
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/all-users",
        headers
      );
      if (data.success) setUsers(data.users);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const updateUser = async (payload) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-user",
        payload,
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllUsers();
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-user",
        { userId },
        headers
      );
      if (data.success) {
        toast.success(data.message);
        getAllUsers();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const value = {
    backendUrl,
    currencySymbol,
    aToken,
    login,
    logout,
    doctors,
    getAllDoctors,
    changeAvailability,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    appointments,
    getAllAppointments,
    cancelAppointment,
    updateAppointment,
    deleteAppointment,
    users,
    getAllUsers,
    updateUser,
    deleteUser,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
