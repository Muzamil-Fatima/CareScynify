import { Outlet } from "react-router-dom";

const PharmacyLayout = () => {

  return (
    <div className="flex h-screen bg-gray-50">
  

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PharmacyLayout;