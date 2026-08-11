import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import GlobalSearchContext from "./GlobalSearchContext";

const GlobalSearchProvider = ({ children }) => {
  const location = useLocation();

  const [searchValues, setSearchValues] = useState({});

  const currentPath = location.pathname;

  const searchValue = searchValues[currentPath] || "";

  // Set search value
  const setSearchValue = useCallback(
    (value) => {
      setSearchValues((prev) => ({
        ...prev,
        [currentPath]: value,
      }));
    },
    [currentPath],
  );

  // ---------------------------------------
  // Clear search value
  // ---------------------------------------
  const clearSearch = useCallback(() => {
    setSearchValues((prev) => {
      // Nothing to clear
      if (!prev[currentPath]) {
        return prev;
      }

      const updated = { ...prev };

      delete updated[currentPath];

      return updated;
    });
  }, [currentPath]);

  return (
    <GlobalSearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        clearSearch,
        currentPath,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
};

export default GlobalSearchProvider;
