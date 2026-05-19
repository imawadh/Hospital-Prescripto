import { Router } from "express";
import {
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
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// Full CRUD for the admin dashboard
adminRouter.post(
  "/update-doctor",
  authAdmin,
  upload.single("image"),
  updateDoctor
);
adminRouter.post("/delete-doctor", authAdmin, deleteDoctor);
adminRouter.get("/all-users", authAdmin, allUsers);
adminRouter.post("/update-user", authAdmin, updateUser);
adminRouter.post("/delete-user", authAdmin, deleteUser);
adminRouter.post("/update-appointment", authAdmin, updateAppointment);
adminRouter.post("/delete-appointment", authAdmin, deleteAppointment);

export default adminRouter;
