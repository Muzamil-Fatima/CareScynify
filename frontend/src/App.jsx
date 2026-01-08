import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import LandingPage from "./pages/Home/LandingPage";
import AboutUs from "./pages/About/AboutUs";
import ContactInfo from "./pages/ContactUs/ContactInfo";
import Opportunity from "./pages/Internship/Opportunity";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Forget from "./pages/Auth/Forget";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
function App() {
  return (
    <>
      <Toaster
        position="top-right" 
        gutter={12} 
        containerClassName=""
        toastOptions={{
          duration: 4000, 
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="text-black bg-white font m-0 p-0 box-border font pt-20">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<Forget />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/internship" element={<Opportunity />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
