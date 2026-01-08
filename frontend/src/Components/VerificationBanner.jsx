import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../Utils/api";

const VerificationBanner = () => {
  const resendVerification = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/resend-verification`);
      toast.success("Verification email sent. Please check your inbox");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-red-500/70 text-white text-center py-2 text-sm">
      Your email is not verified.
      <span
        onClick={resendVerification}
        className="underline ml-1 cursor-pointer font-semibold"
      >
        Resend Verification Email
      </span>
    </div>
  );
};

export default VerificationBanner;
