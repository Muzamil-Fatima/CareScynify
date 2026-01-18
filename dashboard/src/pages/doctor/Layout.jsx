// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

const DoctorLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}

      <div className="flex flex-col flex-1">
        {/* <Topbar /> */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DoctorLayout;
