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
import DoctorPatientProvider from "./context/patients/DoctorPatientProvider.jsx";
import OrderProvider from "./context/pharmacy/OrderProvider.jsx";
import LabProfileProvider from "./context/laboratory/LabProfileProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PharmacyProvider>
            <OrderProvider>
              <MedicineProvider>
                <NotificationProvider>
                  <LabProfileProvider>
                    <DoctorPatientProvider>
                      <DoctorProvider>
                        <App />
                      </DoctorProvider>
                    </DoctorPatientProvider>
                  </LabProfileProvider>
                </NotificationProvider>
              </MedicineProvider>
            </OrderProvider>
          </PharmacyProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
