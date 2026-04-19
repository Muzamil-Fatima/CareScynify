import React, { useState } from "react";
import { JobsContext } from "./JobsContext";
import jobsData from "../data/jobsData";

const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState(jobsData);

  const addJob = (job) => {
    setJobs((prev) => [job, ...prev]);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export default JobsProvider;