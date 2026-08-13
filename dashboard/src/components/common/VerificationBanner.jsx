import React, { useState } from "react";
import toast from "react-hot-toast";
import { resendVerification } from "../../api/authApi";

const VerificationBanner = () => {
  const [loading, setLoading] = useState(false);

  const handleResendVerification = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await resendVerification();

      toast.success(
        res.message || "Verification email sent. Please check your inbox."
      );
    } catch (error) {
      console.error("Resend verification error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to send verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-500/90 text-white px-4 py-2 text-sm flex items-center justify-center gap-1">
      <span>Your email is not verified.</span>

      <button
        type="button"
        onClick={handleResendVerification}
        disabled={loading}
        className="underline font-semibold hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
    </div>
  );
};

export default VerificationBanner;