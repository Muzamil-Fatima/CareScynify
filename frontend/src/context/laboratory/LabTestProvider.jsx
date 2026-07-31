import { useState } from "react";
import { LabTestContext } from "./LabTestContext";

const LabTestProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <LabTestContext.Provider
      value={{
        tests,
        setTests,
        selectedTest,
        setSelectedTest,
      }}
    >
      {children}
    </LabTestContext.Provider>
  );
};

export default LabTestProvider;
