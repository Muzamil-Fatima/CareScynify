import React, { useState } from "react";

import toast from "react-hot-toast";

import { useNavigate, useLocation } from "react-router-dom";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { resetPassword } from "../../api/authApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const resetToken =
    location.state?.resetToken || localStorage.getItem("resetToken");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      toast.error("Password reset session has expired. Please try again.");
      navigate("/forgot-password");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await resetPassword({
        password,
        resetToken,
      });

      toast.success(res.message || "Password reset successfully");

      localStorage.removeItem("resetToken");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-11/12 max-w-md space-y-6"
        onSubmit={handleReset}
      >
        <h2 className="text-3xl font-bold text-center">
          Reset Password
        </h2>

        {/* NEW PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <VisibilityOutlinedIcon fontSize="small" />
            )}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
          >
            {showConfirmPassword ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <VisibilityOutlinedIcon fontSize="small" />
            )}
          </button>
        </div>

        {/* RESET BUTTON */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;