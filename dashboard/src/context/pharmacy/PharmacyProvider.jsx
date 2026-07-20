import PharmacyContext from "./PharmacyContext";



const PharmacyProvider = ({ children }) => {
 


  const value = {
 
  };

  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  );
};

export default PharmacyProvider;