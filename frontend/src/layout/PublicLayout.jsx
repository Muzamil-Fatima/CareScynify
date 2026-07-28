import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";
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
