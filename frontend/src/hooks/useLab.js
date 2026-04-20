import { useContext } from "react";
import { LabContext } from "../context/lab/LabContext";

export const useLab = () => useContext(LabContext);