import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider";
import { DrProvider } from "./context/doctor/DrProvider";
import { PatientProvider } from "./context/patient/PatientProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PatientProvider>
      <DrProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </DrProvider>
    </PatientProvider>
  </StrictMode>,
);
