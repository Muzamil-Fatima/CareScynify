import { useState } from "react";
import { DrContext } from "./DrContext";

export const DrProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <DrContext.Provider value={{ doctor, setDoctor, loading, setLoading }}>
      {children}
    </DrContext.Provider>
  );
};
