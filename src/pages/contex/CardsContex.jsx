import { createContext, useState } from "react";

export const CardsContext = createContext(null);

function CardsProvider({ children }) {
  const [editName, setEditName] = useState("");
  const [edit, setEdit] = useState(true);
  const [currentId, setCurrentId] = useState();
  const [arrow, setArrow] = useState("none");
  const [saveOrEdit, setSaveOrEdit] = useState("Edit");
  const [deleteDisplay, setDeleteDisplay] = useState();
  const [cursor, setCursor] = useState("default");
  const [editAmount, setEditAmount] = useState();
  const [editType, setEditType] = useState();
  const [cardDate, setCardDate] = useState();
  const [expenseIncome, setExpenseIncome] = useState("Expense");
  const [display, setDisplay] = useState("All");
  const [cardInfoModal, setCardInfoModal] = useState("none");

  function openCardInfo() {
    setCardInfoModal("flex");
  }
  return (
    <CardsContext.Provider
      value={{
        openCardInfo,
        cardInfoModal,
        setCardInfoModal,
        editName,
        setEditName,
        edit,
        setEdit,
        currentId,
        setCurrentId,
        arrow,
        setArrow,
        saveOrEdit,
        setSaveOrEdit,
        deleteDisplay,
        setDeleteDisplay,
        cursor,
        setCursor,
        editAmount,
        setEditAmount,
        editType,
        setEditType,
        cardDate,
        setCardDate,
        expenseIncome,
        setExpenseIncome,
        display,
        setDisplay,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export default CardsProvider;
