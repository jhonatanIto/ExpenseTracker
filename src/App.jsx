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
    } catch (e) {
      console.log("cannot read localstorage", e);
    }
  }, []);

  return (
    <>
      <Header />
      <Calendar />
      <Main
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
      <CardInfo cardInfoModal={cardInfoModal} closeModal={closeModal} />
    </>
  );
}

export default App;
