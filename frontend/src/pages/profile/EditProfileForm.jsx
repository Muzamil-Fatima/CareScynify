import React, { useState } from "react";

const EditProfileForm = ({ patient, updatePatient }) => {
  const [form, setForm] = useState({
    name: patient?.name || "",
    age: patient?.age || "",
    phone: patient?.phone || "",
    address: patient?.address || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-5 space-y-3"
    >
      <h2 className="text-xl font-bold">Edit Profile</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 w-full"
      />

      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        className="border p-2 w-full"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full"
      />

      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default EditProfileForm;
