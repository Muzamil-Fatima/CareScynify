import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider";
import DoctorProvider from "./context/doctor/DoctorProvider";
import NotificationProvider from "./context/notification/NotificationProvider";
import UserProvider from "./context/user/UserProvider";
// import  PatientProvider  from "./context/patients/PatientProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <PatientProvider> */}
    <UserProvider>
      <NotificationProvider>
        <DoctorProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </DoctorProvider>
      </NotificationProvider>
    </UserProvider>
    {/* </PatientProvider> */}
  </StrictMode>,
);
