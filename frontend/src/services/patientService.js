import { BASE_URL } from "../Utils/api";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export const getPatientProfile = async () => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

  const res = await fetch("/api/patient/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("API failed");
  }

  return res.json();
};

export const updatePatientProfile = async (data) => {
  const res = await fetch(`${BASE_URL}/api/patient/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  return res.json();
};