import React, { useState } from "react";
import { useJobs } from "../../hooks/useJobs";

const Jobs = () => {
  const { jobs, addJob } = useJobs();

  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      ...form,
    };

    addJob(newJob);

    setForm({
      title: "",
      type: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Jobs & Opportunities
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto mb-10"
      >
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="type"
          placeholder="Type (Hospital, Lab, Doctor, Pharmacy)"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Post Job
        </button>
      </form>

      {/* JOB LIST */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>

            <p className="text-blue-600 mt-1">🏷 {job.type}</p>
            <p className="text-gray-500 text-sm">📍 {job.location}</p>

            <p className="mt-3 text-sm text-gray-700">
              {job.description}
            </p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
              Apply Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Jobs;