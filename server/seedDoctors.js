import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectdb from "./config/mongodb.js";
import doctorModel from "./models/doctorModal.js";

// Base URL the seeded image paths point to (must match where the server runs)
const BACKEND_URL =
  process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`;

const ABOUT =
  "Dr. has a strong commitment to delivering comprehensive medical care, " +
  "focusing on preventive medicine, early diagnosis, and effective treatment " +
  "strategies, ensuring every patient receives attentive and personalised care.";

// Dummy doctors (images served from server/uploads/doctors via /images)
const doctors = [
  { name: "Dr. Richard James", speciality: "General physician", experience: "4 Years", fees: 50, line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Emily Larson", speciality: "Gynecologist", experience: "3 Years", fees: 60, line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Sarah Patel", speciality: "Dermatologist", experience: "1 Years", fees: 30, line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Christopher Lee", speciality: "Pediatricians", experience: "2 Years", fees: 40, line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Jennifer Garcia", speciality: "Neurologist", experience: "4 Years", fees: 50, line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Andrew Williams", speciality: "Neurologist", experience: "4 Years", fees: 50, line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Christopher Davis", speciality: "General physician", experience: "4 Years", fees: 50, line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Timothy White", speciality: "Gynecologist", experience: "3 Years", fees: 60, line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Ava Mitchell", speciality: "Dermatologist", experience: "1 Years", fees: 30, line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Jeffrey King", speciality: "Pediatricians", experience: "2 Years", fees: 40, line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Zoe Kelly", speciality: "Neurologist", experience: "4 Years", fees: 50, line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Patrick Harris", speciality: "Neurologist", experience: "4 Years", fees: 50, line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Chloe Evans", speciality: "General physician", experience: "4 Years", fees: 50, line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Ryan Martinez", speciality: "Gynecologist", experience: "3 Years", fees: 60, line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
  { name: "Dr. Amelia Hill", speciality: "Dermatologist", experience: "1 Years", fees: 30, line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
];

// Build a login email from a doctor name, e.g. "Dr. Richard James" -> "richard.james@prescripto.com"
const emailFor = (name) =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ".") + "@prescripto.com";

const seed = async () => {
  try {
    await connectdb();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("doctor123", salt);

    let inserted = 0;
    let updated = 0;

    for (let i = 0; i < doctors.length; i++) {
      const d = doctors[i];
      const email = emailFor(d.name);

      const doctorData = {
        name: d.name,
        email,
        password: hashedPassword,
        image: `${BACKEND_URL}/images/doc${i + 1}.png`,
        speciality: d.speciality,
        degree: "MBBS",
        experience: d.experience,
        about: ABOUT,
        available: true,
        fees: d.fees,
        address: { line1: d.line1, line2: d.line2 },
        date: Date.now(),
        slots_booked: {},
      };

      const existing = await doctorModel.findOne({ email });
      if (existing) {
        await doctorModel.updateOne({ email }, doctorData);
        updated++;
      } else {
        await doctorModel.create(doctorData);
        inserted++;
      }
    }

    console.log(`Seed complete: ${inserted} inserted, ${updated} updated.`);
    console.log("Doctor login password for all seeded doctors: doctor123");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
