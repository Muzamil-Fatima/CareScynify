import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import DoctorProvider from "./context/doctor/DoctorProvider.jsx";
import LabProvider from "./context/lab/LabProvider.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import PatientProvider from "./context/patients/PatientProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SymptomProvider from "./context/symptomAnalyzer/SymptomProvider.jsx";
import PharmacyProvider from "./context/pharmacy/PharmacyProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppointmentProvider>
      <PharmacyProvider>
        <PatientProvider>
          <LabProvider>
            <DoctorProvider>
              <AuthProvider>
                <SymptomProvider>
                  <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                      <App />
                    </QueryClientProvider>
                  </BrowserRouter>
                </SymptomProvider>
              </AuthProvider>
            </DoctorProvider>
          </LabProvider>
        </PatientProvider>
      </PharmacyProvider>
    </AppointmentProvider>
  </StrictMode>,
);
