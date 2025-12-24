import { createContext, useState } from "react";

export const DatesContex = createContext(null);

function DatesProvider({ children }) {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);

  return (
    <DatesContex.Provider
      value={{
        month,
        setMonth,
        year,
        setYear,
        day,
        setDay,
      }}
    >
      {children}
    </DatesContex.Provider>
  );
}

export default DatesProvider;
