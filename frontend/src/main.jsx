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
import JobsProvider from "./context/jobs/JobsProvider.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import PatientProvider from "./context/patients/PatientProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AppointmentProvider>
    <PatientProvider>
      <JobsProvider>
        <PharmacyProvider>
          <LabProvider>
            <HospitalProvider>
              <ClinicProvider>
                <DoctorProvider>
                  <AuthProvider>
                    <BrowserRouter>
                      <StrictMode>
                        <App />
                      </StrictMode>
                    </BrowserRouter>
                  </AuthProvider>
                </DoctorProvider>
                ,
              </ClinicProvider>
              ,
            </HospitalProvider>
            ,
          </LabProvider>
          ,
        </PharmacyProvider>
        ,
      </JobsProvider>
      ,
    </PatientProvider>
  </AppointmentProvider>,
);
