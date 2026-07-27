import { useContext } from "react";

import LabTestContext from "../../context/laboratory/LabTestContext";


const useLabTest = () => {

  const context = useContext(LabTestContext);


  if (!context) {
    throw new Error(
      "useLabTest must be used inside LabTestProvider"
    );
  }


  return context;

};


export default useLabTest;