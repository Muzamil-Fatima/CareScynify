import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider";
import DoctorProvider from "./context/doctor/DoctorProvider";
import NotificationProvider from "./context/notification/NotificationProvider";
import UserProvider from "./context/user/UserProvider";
import PharmacyProvider from "./context/pharmacy/PharmacyProvider.jsx";
import MedicineProvider from "./context/pharmacy/MedicineProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PharmacyProvider>
            <MedicineProvider>
              <NotificationProvider>
                <DoctorProvider>
                  <App />
                </DoctorProvider>
              </NotificationProvider>
            </MedicineProvider>
          </PharmacyProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
