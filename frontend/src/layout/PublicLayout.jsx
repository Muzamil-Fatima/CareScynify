import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default PublicLayout;
