import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/api.js";
import { useLocation, useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email =
    location.state?.email || localStorage.getItem("verifyEmail") || "";

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // move to the next box
      if (value && index < otp.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  // VerifyEmail.js
  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter a 6 digit code");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        otp: code,
        email,
      });

      if (response.data.success) {
        toast.success("OTP verified successfully");
        const resetToken = response.data.resetToken; // temporary token
        navigate("/reset-password", { state: { email, resetToken } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    }
  };
  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found. Please signup again.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/resend-reset-otp`, {
        email,
      });

      if (res.data.success) {
        toast.success("OTP sent again successfully.");

        // Optional: clear old OTP inputs
        setOtp(["", "", "", "", "", ""]);
        inputRef.current[0]?.focus();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-6 bg-gray-50">
      <form
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-11/12 max-w-md space-y-6"
        onSubmit={handleVerify}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Verify Email
        </h2>
        <p className="text-center text-gray-500">
          Enter the OTP sent to your email
        </p>
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => {
            return (
              <input
                key={index}
                value={digit}
                type="text"
                placeholder="X"
                className="w-10 h-10 sm:w-12 sm:h-12 border-2   p-0 text-center font-bold text-xl sm:text-2xl rounded-xl border-gray-300 focus:border-purple-500 focus:outline-none"
                required
                ref={(el) => (inputRef.current[index] = el)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleChange(e, index)}
                maxLength={1}
              />
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 text-sm sm:text-base"
        >
          Verify
        </button>
        <p className="text-sm text-center text-gray-500 mt-3">
          Didn't receive token?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-purple-500 underline cursor-pointer"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyEmail;
