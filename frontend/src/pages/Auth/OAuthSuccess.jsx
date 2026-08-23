import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getMe } from "../../api/authApi";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          toast.error("Google authentication failed");
          navigate("/login", { replace: true });
          return;
        }

        // Store token
        localStorage.setItem("token", token);

        // Get authenticated user
        const res = await getMe();

        const user = res?.user;

        if (!user) {
          throw new Error("Unable to get user information");
        }

        toast.success("Google login successful");

        // Redirect according to role
        if (
          user.role === "doctor" ||
          user.role === "laboratory" ||
          user.role === "pharmacy" ||
          user.role === "admin"
        ) {
          // These roles normally belong to dashboard app
          window.location.href = `${
            import.meta.env.VITE_DASHBOARD_URL
          }`;
        } else {
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("OAuth success error:", error);

        localStorage.removeItem("token");

        toast.error(
          error.response?.data?.message ||
            "Google authentication failed"
        );

        navigate("/login", { replace: true });
      }
    };

    handleOAuthSuccess();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

        <h2 className="text-xl font-semibold text-gray-800">
          Signing you in...
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Please wait while we complete Google authentication.
        </p>
      </div>
    </div>
  );
};

export default OAuthSuccess;