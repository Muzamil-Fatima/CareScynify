import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";

export const useJobs = () => useContext(JobsContext);