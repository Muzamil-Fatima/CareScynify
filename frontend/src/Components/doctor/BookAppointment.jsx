import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDoctorProfile } from "../../hooks/useDoctorProfile";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

/* ---------------- SLOT GENERATOR ---------------- */
const generateSlots = (start, end, duration = 30) => {
  const slots = [];

  if (!start || !end) return slots;

  let [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);

  const current = new Date();
  current.setHours(sh, sm, 0, 0);

  const endTime = new Date();
  endTime.setHours(eh, em, 0, 0);

  while (current < endTime) {
    const slotStart = new Date(current);
    current.setMinutes(current.getMinutes() + duration);

    const slotEnd = new Date(current);

    if (slotEnd <= endTime) {
      slots.push({
        label: slotStart.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        hour: slotStart.getHours(),
      });
    }
  }

  return slots;
};

/* ---------------- GROUP ---------------- */
const groupSlots = (slots) => ({
  morning: slots.filter((s) => s.hour < 12),
  afternoon: slots.filter((s) => s.hour >= 12 && s.hour < 17),
  evening: slots.filter((s) => s.hour >= 17),
});

/* ---------------- DATE GENERATOR (5 ONLY) ---------------- */
const generateDates = (offset = 0) => {
  const days = [];

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + offset + i);

    days.push({
      label: d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      value: d.toISOString().split("T")[0],
    });
  }

  return days;
};

const BookAppointment = () => {
  const { id } = useParams();
  const { doctor, loading } = useDoctorProfile(id);

  const [offset, setOffset] = useState(0);
  const dates = useMemo(() => generateDates(offset), [offset]);

  const [date, setDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [time, setTime] = useState("");
  const [selectedWorkplace, setSelectedWorkplace] = useState(null);

  const workplace = selectedWorkplace || doctor?.workplaces?.[0];

  const duration = useMemo(() => {
    const d = workplace?.settings?.appointmentDuration;
    if (!d) return 30;
    return d.unit === "hours" ? d.value * 60 : d.value;
  }, [workplace]);

  const slots = useMemo(() => {
    if (!workplace || !date) return [];

    const selectedDay = new Date(date);
    const todayKey = selectedDay.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const availability = workplace?.availability?.[todayKey];

    if (!availability?.start || !availability?.end) return [];

    return generateSlots(availability.start, availability.end, duration);
  }, [workplace, date, duration]);

  const grouped = useMemo(() => groupSlots(slots), [slots]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!doctor) return <div className="text-center py-10">Doctor not found</div>;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white border rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={doctor?.user?.avatar}
            className="w-20 h-20 rounded-full"
            alt="doctor"
          />
          <div>
            <h2 className="text-xl font-semibold">{doctor?.user?.name}</h2>
            <p className="text-gray-500">{doctor?.specialization}</p>
          </div>
        </div>

        {/* WORKPLACES */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {doctor?.workplaces?.map((wp) => (
            <button
              key={wp._id}
              onClick={() => {
                setSelectedWorkplace(wp);
                setTime("");
              }}
              className={`px-3 py-2 text-sm rounded-full border ${
                workplace?._id === wp._id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {wp.name}
            </button>
          ))}
        </div>

        {/* DATE BAR (FIXED 5 ITEMS) */}
        <div className="flex items-center gap-3 mb-5 border-b pb-3">

          {/* PREVIOUS */}
          <button
            onClick={() => setOffset((prev) => Math.max(prev - 5, 0))}
            disabled={offset === 0}
            className={`p-2 rounded-full transition ${
              offset === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-purple-600 hover:text-white"
            }`}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </button>

          {/* DATE LIST (5 ONLY FIXED WIDTH) */}
          <div className="flex flex-1 gap-2">
            {dates.map((d) => (
              <button
                key={d.value}
                onClick={() => {
                  setDate(d.value);
                  setTime("");
                }}
                className={`flex-1 px-2 py-2 rounded-lg text-sm border transition ${
                  date === d.value
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* NEXT */}
          <button
            onClick={() => setOffset((prev) => prev + 5)}
            className="
              p-2 rounded-full
              bg-gray-100
              hover:bg-purple-600 hover:text-white
              transition
            "
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>

        </div>

        {/* FEE */}
        <div className="flex justify-between bg-purple-50 p-3 rounded-xl mb-5">
          <span>Consultation Fee</span>
          <span className="font-semibold text-purple-700">
            Rs. {workplace?.settings?.appointmentFee || 2000}
          </span>
        </div>

        {/* SLOTS */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm mb-3">
            <AccessTimeOutlinedIcon fontSize="small" />
            Select Time Slot
          </label>

          {slots.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No availability for selected date
            </p>
          ) : (
            ["morning", "afternoon", "evening"].map((section) => (
              <div key={section} className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 capitalize">
                  {section}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {grouped[section]?.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setTime(slot.label)}
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        time === slot.label
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* BOOK */}
        <button className="w-full bg-purple-600 text-white py-3 rounded-xl">
          Book Appointment
        </button>

      </div>
    </div>
  );
};

export default BookAppointment;