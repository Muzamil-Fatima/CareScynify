import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import useLabBookTest from "../../hooks/laboratory/useBookLabTest";

const TestBookSuccess = () => {
  const { id } = useParams();

  const { fetchBookingById } = useLabBookTest();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const data = await fetchBookingById(id);
        setBooking(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      loadBooking();
    }
  }, [id, fetchBookingById]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircleRoundedIcon
            className="text-green-600!"
            sx={{ fontSize: 60 }}
          />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Test Booked Successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Your laboratory test has been booked successfully. The laboratory will
          contact you if any additional information is required.
        </p>

        <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-semibold">{booking?.sampleId || "-"}</span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold text-green-600">
              {booking?.paymentStatus || "Pending"}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-gray-500">Sample Status</span>
            <span className="font-semibold">
              {booking?.sampleStatus || "-"}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-purple-700">
              {booking?.status || "Booked"}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            to="/lab-tests"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3 font-semibold text-white hover:bg-purple-800"
          >
            <ScienceOutlinedIcon />
            View My Bookings
          </Link>

          <Link
            to="/laboratory"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-700 py-3 font-semibold text-purple-700 hover:bg-purple-50"
          >
            <BiotechOutlinedIcon />
            Book Another Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestBookSuccess;
