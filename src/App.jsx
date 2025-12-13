import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Calendar from "./components/MorningCalendar";
import CardInfo from "./components/CardInfo";

function App() {
  const [cards, setCards] = useState([]);
  const [expenseIncome, setExpenseIncome] = useState("Expense");
  const [modalDisplay, setModalDisplay] = useState("none");
  const [cardInfoModal, setCardInfoModal] = useState("none");
  const [id, setId] = useState(0);
  const [currentId, setCurrentId] = useState();
  const [edit, setEdit] = useState(true);
  const [saveOrEdit, setSaveOrEdit] = useState("Edit");
  const [deleteDisplay, setDeleteDisplay] = useState("none");
  const [arrow, setArrow] = useState("none");
  const [cursor, setCursor] = useState("default");
  const [editName, setEditName] = useState();
  const [editAmount, setEditAmount] = useState();
  const [editCurrency, setEditCurrency] = useState();
  const [editType, setEditType] = useState();

  function closeModal(e) {
    if (e.target.id === "modalBody" || e.target.id === "save") {
      setModalDisplay("none");
    } else if (e.target.id === "cardInfoBody") {
      setCardInfoModal("none");
    }
  }
  function openModal(type) {
    setModalDisplay("flex");
    setExpenseIncome(type);
  }
  function openCardInfo() {
    setCardInfoModal("flex");
  }
  function saveData(cards) {
    localStorage.setItem("Expenses", JSON.stringify(cards));
  }
  useEffect(() => {
    let saved = localStorage.getItem("Expenses");
    try {
      const db = saved ? JSON.parse(saved) : [];
      setCards(db);

      const maxId = db.length > 0 ? Math.max(...db.map((c) => c.id)) : 0;
      setId(maxId + 1);
    } catch (e) {
      console.log("cannot read localstorage", e);
    }
  }, []);

  useEffect(() => {
    setEditName(editName);
  }, [editName]);

  return (
    <>
      <Header />
      <Calendar />
      <Main
        setEditType={setEditType}
        setEditCurrency={setEditCurrency}
        setEditAmount={setEditAmount}
        setEditName={setEditName}
        setCursor={setCursor}
        setDeleteDisplay={setDeleteDisplay}
        setSaveOrEdit={setSaveOrEdit}
        setArrow={setArrow}
        setEdit={setEdit}
        setCurrentId={setCurrentId}
        openCardInfo={openCardInfo}
        cards={cards}
        openModal={openModal}
        setModalDisplay={setModalDisplay}
      />
      <Modal
        cards={cards}
        setCards={setCards}
        expenseIncome={expenseIncome}
        closeModal={closeModal}
        modalDisplay={modalDisplay}
        saveData={saveData}
        id={id}
        setId={setId}
      />
      <CardInfo
        setEditType={setEditType}
        setEditCurrency={setEditCurrency}
        setEditAmount={setEditAmount}
        setEditName={setEditName}
        editType={editType}
        editCurrency={editCurrency}
        editAmount={editAmount}
        editName={editName}
        setCursor={setCursor}
        cursor={cursor}
        setDeleteDisplay={setDeleteDisplay}
        deleteDisplay={deleteDisplay}
        setSaveOrEdit={setSaveOrEdit}
        saveOrEdit={saveOrEdit}
        setArrow={setArrow}
        arrow={arrow}
        setEdit={setEdit}
        edit={edit}
        setCards={setCards}
        saveData={saveData}
        cards={cards}
        currentId={currentId}
        cardInfoModal={cardInfoModal}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
