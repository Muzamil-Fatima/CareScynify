import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Utils/api";
import { useNavigate, useLocation } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken; // get token from state
  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/reset-password`,
        { password },
        {
          headers: { Authorization: `Bearer ${resetToken}` },
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-11/12 max-w-md space-y-6"
        onSubmit={handleReset}
      >
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
