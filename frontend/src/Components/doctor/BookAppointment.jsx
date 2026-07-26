import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getAvailableSlots } from "../../api/appointmentApi";
import { useDoctorProfile } from "../../hooks/useDoctorProfile";
import { useAppointment } from "../../hooks/useAppointments";
import { socket } from "../../socket/socket";
import { toast } from "react-toastify";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedDoctor = location.state?.doctor;

  const { doctor: apiDoctor, loading } = useDoctorProfile(
    passedDoctor ? null : id,
  );

  const doctor = passedDoctor || apiDoctor;
  const { bookAppointment, reserveAppointment, bookingLoading } =
    useAppointment();
  const [bookingError, setBookingError] = useState("");
  /* ---------------- STATE ---------------- */
  const [offset, setOffset] = useState(0);
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const [time, setTime] = useState("");

  const [appointmentType, setAppointmentType] = useState("online");
  const [selectedWorkplace, setSelectedWorkplace] = useState(null);

  useEffect(() => {
    if (doctor?.workplaces?.length && !selectedWorkplace) {
      setSelectedWorkplace(doctor.workplaces[0]);
    }
  }, [doctor, selectedWorkplace]);

  const workplace = useMemo(() => {
    return selectedWorkplace || null;
  }, [selectedWorkplace]);

  /* ---------------- DATES ---------------- */
  const dates = useMemo(() => {
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
  }, [offset]);

  /* ---------------- SLOTS ---------------- */
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const fetchSlots = useCallback(
    async (showLoader = true) => {
      if (!doctor?._id || !workplace?._id || !date) return;

      try {
        if (showLoader) {
          setLoadingSlots(true);
        }

        const data = await getAvailableSlots(doctor._id, workplace._id, date);

        setSlots(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        if (showLoader) {
          setLoadingSlots(false);
        }
      }
    },
    [doctor, workplace, date],
  );
  useEffect(() => {
    fetchSlots(false);
  }, [fetchSlots]);
  useEffect(() => {
    const handleSlotUpdate = (data) => {
      if (
        data.doctorId === doctor?._id &&
        data.workplaceId === workplace?._id &&
        data.date === date
      ) {
        fetchSlots(false);
      }
    };

    socket.on("slot-updated", handleSlotUpdate);

    return () => socket.off("slot-updated", handleSlotUpdate);
  }, [doctor, workplace, date, fetchSlots]);
  /* ---------------- RESET ---------------- */
  useEffect(() => {
    setTime("");
  }, [appointmentType]);

  /* ---------------- BOOKING ---------------- */
  const handleBook = async () => {
    if (!selectedSlot || !workplace) return;

    try {
      setBookingError("");

      await bookAppointment({
        doctorId: doctor._id,
        workplaceId: workplace._id,
        date,
        time: selectedSlot,
        appointmentType,
      });

      // Instant UI update
      setSlots((prev) => prev.filter((s) => s.label !== time));

      const updated = await getAvailableSlots(doctor._id, workplace._id, date);

      setSlots(updated || []);
      setTime("");

      toast.success("Your appointment request sent successfully!");

      setTimeout(() => {
        navigate("/appointments");
      }, 1200);
    } catch (err) {
      setBookingError(err?.response?.data?.message || "Booking failed.");
    }
  };
  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!doctor) return <div className="text-center py-10">Doctor not found</div>;

  /* ---------------- FORMAT SLOT LABEL (AM/PM FIX) ---------------- */
  const formatSlotLabel = (label) => {
    if (!label) return "";

    const lower = label.toLowerCase();

    // already AM/PM
    if (lower.includes("am") || lower.includes("pm")) {
      return label;
    }

    // 24-hour → AM/PM
    let [hour, min] = label.split(":").map(Number);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${min.toString().padStart(2, "0")} ${ampm}`;
  };

  /* ---------------- GROUPING ---------------- */
  const convertTo24Hour = (label) => {
    if (!label) return 0;

    const lower = label.toLowerCase();

    if (!lower.includes("am") && !lower.includes("pm")) {
      const [h] = label.split(":").map(Number);
      return h;
    }

    let [timePart, modifier] = label.split(" ");
    let [hours] = timePart.split(":").map(Number);

    modifier = modifier?.toLowerCase();

    if (modifier === "pm" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "am" && hours === 12) {
      hours = 0;
    }

    return hours;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <img
            src={doctor?.user?.avatar?.url}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
            alt="doctor"
          />
          <div>
            <h2 className="text-lg font-semibold">{doctor?.user?.name}</h2>
            <p className="text-gray-500 text-sm">{doctor?.specialization}</p>
          </div>
        </div>

        {/* APPOINTMENT TYPE */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => {
              setAppointmentType("online");
              setBookingError("");
            }}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              appointmentType === "online"
                ? "bg-white shadow text-purple-600"
                : "text-gray-600"
            }`}
          >
            💻 Online
          </button>

          <button
            onClick={() => {
              setAppointmentType("physical");
              setBookingError("");
            }}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              appointmentType === "physical"
                ? "bg-white shadow text-purple-600"
                : "text-gray-600"
            }`}
          >
            🏥 physical
          </button>
        </div>

        {/* WORKPLACES */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {doctor?.workplaces?.map((wp) => (
            <button
              key={wp._id}
              onClick={() => {
                setSelectedWorkplace(wp);
                setTime("");
                setBookingError("");
              }}
              className={`px-3 py-1.5 text-sm rounded-full border whitespace-nowrap transition ${
                workplace?._id === wp._id
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-gray-50 text-gray-600 border-gray-200"
              }`}
            >
              {wp.name}
            </button>
          ))}
        </div>

        {/* DATE */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOffset((p) => Math.max(p - 5, 0))}
            className="p-2 rounded-full bg-gray-100"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </button>

          <div className="flex flex-1 gap-2">
            {dates.map((d) => (
              <button
                key={d.value}
                onClick={() => {
                  setDate(d.value);
                  setTime("");
                  setBookingError("");
                }}
                className={`flex-1 px-2 py-2 rounded-lg text-sm border transition ${
                  date === d.value
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOffset((p) => p + 5)}
            className="p-2 rounded-full bg-gray-100"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>

        {/* SLOTS */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-3 text-gray-600">
            <AccessTimeOutlinedIcon fontSize="small" />
            Select Time Slot
          </label>

          {loadingSlots ? (
            <p className="text-gray-400 text-sm">Loading slots...</p>
          ) : slots.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No availability for selected date
            </p>
          ) : (
            (() => {
              const grouped = {
                Night: [],
                Morning: [],
                Afternoon: [],
                Evening: [],
              };

              slots.forEach((slot) => {
                const hour = convertTo24Hour(slot.label);

                let session = "";

                if (hour >= 0 && hour < 5) {
                  session = "Night";
                } else if (hour >= 5 && hour < 12) {
                  session = "Morning";
                } else if (hour >= 12 && hour < 17) {
                  session = "Afternoon";
                } else {
                  session = "Evening";
                }

                grouped[session].push(slot);
              });

              return (
                <div className="space-y-5">
                  {Object.entries(grouped).map(([session, items]) => {
                    if (!items.length) return null;

                    return (
                      <div key={session}>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          {session}
                        </h3>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {items.map((slot, i) => (
                            <button
                              key={i}
                              onClick={async () => {
                                setBookingError("");

                                // first click par hi purple
                                setSelectedSlot(slot.label);
                                setTime(slot.label);

                                try {
                                  if (slot.reservedByMe) {
                                    return;
                                  }

                                  await reserveAppointment({
                                    doctorId: doctor._id,
                                    workplaceId: workplace._id,
                                    date,
                                    time: slot.label,
                                    appointmentType,
                                  });
                                } catch (err) {
                                  setBookingError(
                                    err?.response?.data?.message ||
                                      "Failed to reserve slot.",
                                  );

                                  setSelectedSlot("");
                                  setTime("");
                                }
                              }}
                              className={`px-3 py-2 rounded-lg text-sm border transition ${
                                selectedSlot === slot.label
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {formatSlotLabel(slot.label)}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()
          )}
        </div>

        {/* BOOK BUTTON */}
        <button
          onClick={handleBook}
          disabled={!selectedSlot || bookingLoading || !workplace}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl disabled:opacity-50 font-medium shadow-sm"
        >
          {bookingLoading ? "Booking..." : "Book Appointment"}
        </button>
        {bookingError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-600">{bookingError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
