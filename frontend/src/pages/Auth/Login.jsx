import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/api.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success(`${res.data.name} login successfully.`);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
        })
      );
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error(error);
      console.log(error.response);
      toast.error(error.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="p-20 flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg w-full space-y-6 max-w-sm sm:max-w-md lg:max-w-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl  sm:text-3xl font-bold text-center">
          Login to{" "}
          <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            TecHub
          </span>
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className=" pr-10  px-3 py-2  w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-500 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye className="text-lg sm:text-xl" />
            ) : (
              <FaEyeSlash className="text-lg sm:text-xl" />
            )}
          </span>
        </div>

        <button className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90">
          Login
        </button>
        <p className="text-sm text-center text-gray-500">
          Forgot Password?{" "}
          <Link to="/forget-password" className="text-purple-500 underline">
            Click here
          </Link>
        </p>
        <p className="text-xs sm:text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-500 underline">
            Sign Up
          </Link>
        </p>
        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        {/* Google Login UI */}
        <button
          onClick={() => window.open(`${BASE_URL}/api/auth/google`, "_self")}
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 sm:py-4  rounded-xl font-semibold hover:bg-gray-50"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
