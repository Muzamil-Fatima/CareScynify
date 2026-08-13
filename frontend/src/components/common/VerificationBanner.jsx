import { toast } from "react-hot-toast";
import { resendVerification } from "../../api/authApi";

const VerificationBanner = () => {
  const handleResendVerification = async () => {
    try {
      const res = await resendVerification();

      toast.success(
        res.message || "Verification email sent. Please check your inbox.",
      );
    } catch (error) {
      console.error("Resend verification error:", error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-red-500/70 text-white text-center py-2 text-sm">
      Your email is not verified.
      <span
        onClick={handleResendVerification}
        className="underline ml-1 cursor-pointer font-semibold"
      >
        Resend Verification Email
      </span>
    </div>
  );
};

export default VerificationBanner;
