import React,{ StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import DoctorProvider from "./context/doctor/DoctorProvider.jsx";
import LabProvider from "./context/laboratory/LabProvider.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import PatientProvider from "./context/patients/PatientProvider.jsx";
import SymptomProvider from "./context/symptomAnalyzer/SymptomProvider.jsx";
import PharmacyProvider from "./context/pharmacy/PharmacyProvider.jsx";
import CartProvider from "./context/pharmacy/CartProvider.jsx";
import OrderProvider from "./context/pharmacy/OrderProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppointmentProvider>
      <PharmacyProvider>
        <PatientProvider>
          <LabProvider>
            <DoctorProvider>
              <OrderProvider>
                <CartProvider>
                  <AuthProvider>
                    <SymptomProvider>
                      <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                          <React.StrictMode>
                            <App />
                          </React.StrictMode>
                        </QueryClientProvider>
                      </BrowserRouter>
                    </SymptomProvider>
                  </AuthProvider>
                </CartProvider>
              </OrderProvider>
            </DoctorProvider>
          </LabProvider>
        </PatientProvider>
      </PharmacyProvider>
    </AppointmentProvider>
  </StrictMode>,
);
