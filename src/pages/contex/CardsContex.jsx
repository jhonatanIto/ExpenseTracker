import { createContext, useState } from "react";

export const CardsContext = createContext();

function CardsProvider({ children }) {
  const [editName, setEditName] = useState();
  const [edit, setEdit] = useState();
  const [currentId, SetCurrentId] = useState();
  const [arrow, setArrow] = useState();

  return <CardsContext.Provider value={{}}>{children}</CardsContext.Provider>;
}

export default CardsProvider;
