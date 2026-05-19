import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleError } from "../middlewares/errorHandler.js";
import doctorModel from "../models/doctorModal.js";
import appointmentModel from "../models/appointmentModel.js";

// API to get the public list of doctors (used by the patient frontend)
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    handleError(res, error);
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
    res.json({ success: true, token });
  } catch (error) {
    handleError(res, error);
  }
};

// API to toggle a doctor's availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    handleError(res, error);
  }
};

// API to list a doctor's appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    handleError(res, error);
  }
};

// API for a doctor to mark an appointment complete
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment completed" });
    }
    res.json({ success: false, message: "Mark failed" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for a doctor to cancel an appointment
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    }
    res.json({ success: false, message: "Cancellation failed" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the doctor dashboard summary
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    const patients = [...new Set(appointments.map((item) => item.userId))];

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    handleError(res, error);
  }
};

// API to get a doctor's own profile
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    handleError(res, error);
  }
};

// API for a doctor to update their fees / address / availability
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    handleError(res, error);
  }
};

export {
  doctorList,
  loginDoctor,
  changeAvailability,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
