import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Utils/api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Forget = () => {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleForgot = async (e) => {
    e.preventDefault();
    if (loading) return;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputEmail)) {
      toast.error("Invalid Email format!");
      setIsValidEmail(false);
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
        email: inputEmail,
      });
      toast.success("OTP sent to your email");
      localStorage.setItem("verifyEmail", inputEmail);
      navigate("/verify-email", { state: { email: inputEmail } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-11/12 max-w-md space-y-6"
        onSubmit={handleForgot}
      >
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
        <p className="text-center text-gray-500">
          Enter your email to receive a password reset link
        </p>
        <input
          type="email"
          placeholder="Email"
          className={`w-full p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none  ${
            isValidEmail === false
              ? "border-red-500"
              : "border-white-500"
          }`}
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
        <p className="text-sm text-center text-gray-500 mt-3">
          Remember password?{" "}
          <Link to="/login" className="text-purple-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Forget;
