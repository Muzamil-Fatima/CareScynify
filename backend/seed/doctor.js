import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

import connectDB from "../config/database.js";
import User from "../models/user.js";
import Doctor from "../models/doctorModel.js";

dotenv.config();

const SPECIALIZATIONS = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Plastic Surgeon",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Pediatrician",
  "Psychiatrist",
  "General Physician",
  "ENT Specialist",
  "Dentist",
  "Pulmonologist",
  "Radiologist",
  "Urologist",
  "Oncologist",
];

const CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Multan",
  "Faisalabad",
  "Gujranwala",
  "Sialkot",
  "Peshawar",
  "Quetta",
];

const CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Migraine",
  "Fever",
  "Heart Disease",
  "Skin Allergy",
  "Back Pain",
  "Joint Pain",
  "Headache",
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function generateSlots(start, end, duration = 15) {
  const slots = [];

  let [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);

  let current = sh * 60 + sm;
  let finish = eh * 60 + em;

  while (current + duration <= finish) {
    slots.push({
      startTime: `${String(Math.floor(current / 60)).padStart(
        2,
        "0"
      )}:${String(current % 60).padStart(2, "0")}`,
      isBooked: false,
    });

    current += duration;
  }

  return slots;
}

function generateAvailability() {
  const availability = {};
  const slots = {};

  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
    const startHour = randomNumber(8, 11);
    const endHour = startHour + randomNumber(4, 8);

    const start = `${String(startHour).padStart(2, "0")}:00`;
    const end = `${String(endHour).padStart(2, "0")}:00`;

    availability[day] = {
      start,
      end,
    };

    slots[day] = generateSlots(start, end, 15);
  });

  return { availability, slots };
}

async function seedDoctors() {
  try {
    await connectDB();

    const password = await bcrypt.hash("12345678", 10);

    for (let i = 1; i <= 100; i++) {
      const user = await User.create({
        name: faker.person.fullName(),
        email: `doctor${i}@carescynify.com`,
        password,
        role: "doctor",
        accountVerified: true,
        authProvider: "manual",
        status: "active",
        phone: `03${randomNumber(100000000, 999999999)}`,
        cnic: `${randomNumber(
          1000000000000,
          9999999999999
        )}`,
        address: randomItem(CITIES),
        languages: [
          {
            language: "English",
            proficiency: "Professional",
          },
          {
            language: "Urdu",
            proficiency: "Native",
          },
        ],
      });

      const { availability, slots } = generateAvailability();

      await Doctor.create({
        userId: user._id,

        specialization: randomItem(SPECIALIZATIONS),

        qualifications: faker.helpers.arrayElement([
          "MBBS",
          "MBBS, FCPS",
          "MBBS, MS",
          "MBBS, MCPS",
        ]),

        experience: `${randomNumber(2, 25)} years`,

        licenseNo: `DOC-${100000 + i}`,

        about: faker.lorem.sentences(3),

        treatableConditions: faker.helpers.arrayElements(
          CONDITIONS,
          4
        ),

        status: "active",

        workplaces: [
          {
            name: `${randomItem(CITIES)} Medical Center`,
            location: randomItem(CITIES),
            type: "clinic",

            settings: {
              appointmentDuration: {
                value: 15,
                unit: "minutes",
              },
              appointmentFee: randomNumber(1000, 5000),
              maxPatientsPerDay: 30,
              breakMinutes: 5,
              bookingWindow: 7,
              consultationType: "physical",
            },

            availability,
            slots,
          },
        ],

        education: [
          {
            school: faker.company.name(),
            degree: "MBBS",
            field: "Medicine",
            startYear: "2010",
            endYear: "2015",
            description: "Medical Education",
          },
        ],

        experienceDetails: [
          {
            hospital: faker.company.name(),
            role: "Consultant",
            employmentType: "Full-time",
            location: randomItem(CITIES),
            startYear: "2016",
            endYear: "2025",
            currentlyWorking: true,
            description: "Working as consultant doctor",
          },
        ],

        identityVerification: {
          status: "Verified",
        },
      });

      console.log(`✅ Doctor ${i} created`);
    }

    console.log("\n🎉 100 Doctors Created Successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDoctors();