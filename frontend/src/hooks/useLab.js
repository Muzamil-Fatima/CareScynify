import { useContext } from "react";
import { LabContext } from "../context/LabContext";

export const useLab = () => useContext(LabContext);