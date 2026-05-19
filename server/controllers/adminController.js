import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadImage } from "../config/cloudinary.js";
import { handleError } from "../middlewares/errorHandler.js";
import doctorModel from "../models/doctorModal.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModal.js";

// API for the admin to add a new doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (min 8 characters)",
      });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Doctor already exists with this email",
      });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Doctor image is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await uploadImage(imageFile.buffer);

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: typeof address === "string" ? JSON.parse(address) : address,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      });
      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    handleError(res, error);
  }
};

// API to get all doctors (admin)
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    handleError(res, error);
  }
};

// API to get all appointments (admin)
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to cancel any appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release the doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    if (doctorData) {
      let slots_booked = doctorData.slots_booked;
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(
          (e) => e !== slotTime
        );
      }
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin dashboard summary
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to update an existing doctor
const updateDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Doctor id is required" });
    }

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (speciality !== undefined) updateData.speciality = speciality;
    if (degree !== undefined) updateData.degree = degree;
    if (experience !== undefined) updateData.experience = experience;
    if (about !== undefined) updateData.about = about;
    if (fees !== undefined) updateData.fees = Number(fees);

    if (email !== undefined && email !== doctor.email) {
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please enter a valid email",
        });
      }
      const existingDoctor = await doctorModel.findOne({ email });
      if (existingDoctor && String(existingDoctor._id) !== String(docId)) {
        return res.json({
          success: false,
          message: "Another doctor already uses this email",
        });
      }
      updateData.email = email;
    }

    if (available !== undefined) {
      updateData.available =
        available === true || available === "true";
    }

    if (address !== undefined) {
      updateData.address =
        typeof address === "string" ? JSON.parse(address) : address;
    }

    if (password) {
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "Please enter a strong password (min 8 characters)",
        });
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      const imageUpload = await uploadImage(req.file.buffer);
      updateData.image = imageUpload.secure_url;
    }

    await doctorModel.findByIdAndUpdate(docId, updateData);
    res.json({ success: true, message: "Doctor updated" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndDelete(docId);
    res.json({ success: true, message: "Doctor deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

// API to get all patients (admin)
const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.json({ success: true, users });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to update a patient
const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User id is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const { name, email, phone, gender, dob, address } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (dob !== undefined) updateData.dob = dob;

    if (email !== undefined && email !== user.email) {
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please enter a valid email",
        });
      }
      const existingUser = await userModel.findOne({ email });
      if (existingUser && String(existingUser._id) !== String(userId)) {
        return res.json({
          success: false,
          message: "Another user already uses this email",
        });
      }
      updateData.email = email;
    }

    if (address !== undefined) {
      updateData.address =
        typeof address === "string" ? JSON.parse(address) : address;
    }

    await userModel.findByIdAndUpdate(userId, updateData);
    res.json({ success: true, message: "Patient updated" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to delete a patient
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await userModel.findByIdAndDelete(userId);
    res.json({ success: true, message: "Patient deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to update an appointment (mark completed / paid)
const updateAppointment = async (req, res) => {
  try {
    const { appointmentId, isCompleted, payment } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const updateData = {};
    if (isCompleted !== undefined) {
      updateData.isCompleted = isCompleted === true || isCompleted === "true";
    }
    if (payment !== undefined) {
      updateData.payment = payment === true || payment === "true";
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, updateData);
    res.json({ success: true, message: "Appointment updated" });
  } catch (error) {
    handleError(res, error);
  }
};

// API for the admin to delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Release the doctor's slot if it was still booked
    const { docId, slotDate, slotTime } = appointment;
    const doctorData = await doctorModel.findById(docId);
    if (doctorData) {
      let slots_booked = doctorData.slots_booked;
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(
          (e) => e !== slotTime
        );
      }
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    await appointmentModel.findByIdAndDelete(appointmentId);
    res.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  updateDoctor,
  deleteDoctor,
  allUsers,
  updateUser,
  deleteUser,
  updateAppointment,
  deleteAppointment,
};
