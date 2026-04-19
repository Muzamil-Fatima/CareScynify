import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import DoctorProvider from "./context/DoctorProvider.jsx";
import ClinicProvider from "./context/ClinicProvider.jsx";
import HospitalProvider from "./context/HospitalProvider.jsx";
import LabProvider from "./context/LabProvider.jsx";
import PharmacyProvider from "./context/PharmacyProvider.jsx";
import JobsProvider from "./context/JobsProvider.jsx";

createRoot(document.getElementById("root")).render(
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
  </JobsProvider>,
);
