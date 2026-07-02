import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider";
import DoctorProvider from "./context/doctor/DoctorProvider";
import NotificationProvider from "./context/notification/NotificationProvider";
import UserProvider from "./context/user/UserProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <NotificationProvider>
            <DoctorProvider>
                <App />
            </DoctorProvider>
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
