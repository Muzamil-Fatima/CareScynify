import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyTwoFactorOTP } from "../../api/authApi.js";

const VerifyTwoFactor = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("twoFactorEmail") || "";

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next box
      if (value && index < otp.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter a 6 digit code");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await verifyTwoFactorOTP({
        email,
        otp: code,
      });

      if (response?.success) {
        toast.success("2FA verified successfully");

        // Remove temporary email
        localStorage.removeItem("twoFactorEmail");

        // Get user role
        const role = response.role || "patient";

        // Cross-app role-based navigation
        const roleRoutes = {
          patient: "http://localhost:5173/",
          doctor: "http://localhost:5174/doctor/dashboard",
          pharmacy: "http://localhost:5174/pharmacy/dashboard",
          laboratory: "http://localhost:5174/lab/dashboard",
          admin: "http://localhost:5174/admin/dashboard",
        };

        // Redirect to correct application/dashboard
        window.location.href = roleRoutes[role] || "http://localhost:5173/";
      }
    } catch (error) {
      console.error("2FA verification error:", error);

      toast.error(
        error.response?.data?.message || "Invalid or expired 2FA code",
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-6 bg-gray-50">
      <form
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-11/12 max-w-md space-y-6"
        onSubmit={handleVerify}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Two-Factor Authentication
        </h2>

        <p className="text-center text-gray-500">
          Enter the OTP sent to your email
        </p>

        {email && <p className="text-center text-sm text-gray-400">{email}</p>}

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => {
            return (
              <input
                key={index}
                value={digit}
                type="text"
                inputMode="numeric"
                placeholder="X"
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 p-0 text-center font-bold text-xl sm:text-2xl rounded-xl border-gray-300 focus:border-purple-500 focus:outline-none"
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
          Didn't receive the code?{" "}
          <span className="text-purple-500">Check your email again.</span>
        </p>
      </form>
    </div>
  );
};

export default VerifyTwoFactor;
