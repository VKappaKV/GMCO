import { createContext } from "react";
import { useState } from "react";

const EditingContext = createContext({});

export const EditingContextProvider = ({ children }) => {
  const [key, SetKey] = useState(0);

  return (
    <EditingContext.Provider value={{ key, SetKey }}>
      {children}
    </EditingContext.Provider>
  );
};

export default EditingContext;
