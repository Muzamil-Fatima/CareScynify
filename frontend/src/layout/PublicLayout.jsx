import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
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
