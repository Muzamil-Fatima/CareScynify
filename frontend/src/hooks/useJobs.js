import { useContext } from "react";
import { JobsContext } from "../context/jobs/JobsContext";

export const useJobs = () => useContext(JobsContext);