export const getPatientProfile = async () => {
  const res = await fetch("/api/patient/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return res.json();
};

export const updatePatientProfile = async (data) => {
  const res = await fetch("/api/patient/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};