import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import DoctorProvider from "./context/doctor/DoctorProvider.jsx";
import ClinicProvider from "./context/clinic/ClinicProvider.jsx";
import HospitalProvider from "./context/hospital/HospitalProvider.jsx";
import LabProvider from "./context/lab/LabProvider.jsx";
import PharmacyProvider from "./context/pharmacy/PharmacyProvider.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import PatientProvider from "./context/patients/PatientProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppointmentProvider>
      <PatientProvider>
        <PharmacyProvider>
          <LabProvider>
            <HospitalProvider>
              <ClinicProvider>
                <DoctorProvider>
                  <AuthProvider>
                    <BrowserRouter>
                      <QueryClientProvider client={queryClient}>
                        <App />
                      </QueryClientProvider>
                    </BrowserRouter>
                  </AuthProvider>
                </DoctorProvider>
              </ClinicProvider>
            </HospitalProvider>
          </LabProvider>
        </PharmacyProvider>
      </PatientProvider>
    </AppointmentProvider>
  </StrictMode>,
);
