import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Calendar from "./components/Calendar";
import CardInfo from "./components/CardInfo";

function App() {
  const [{ month, year, day }, setnichi] = useState({
    month: 0,
    year: 0,
    day: 0,
  });

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
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState("JPY");
  const [type, setType] = useState("Fixed");
  const [today, setToday] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [display, setDisplay] = useState("All");
  const [totalExpense, setTotalExpense] = useState();
  const [totalIncome, setTotalIncome] = useState();

  function monthlyTotal(cardss) {
    const map = {};

    cardss.forEach((card) => {
      const date = new Date(card.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!map[year]) {
        map[year] = {};
      }
      if (!map[year][month]) {
        map[year][month] = { income: 0, expense: 0 };
      }

      if (card.expense === "Income") {
        map[year][month].income += Number(card.amount);
      } else {
        map[year][month].expense += Number(card.amount);
      }
    });
    return map;
  }
  function toChartArray(map, year) {
    return Array.from({ length: 12 }, (_, month) => ({
      year,
      month,
      income: map[year]?.[month]?.income ?? 0,
      expense: map[year]?.[month]?.expense ?? 0,
    }));
  }

  const monthlyMap = useMemo(() => {
    return monthlyTotal(cards);
  }, [cards]);

  const selectedYear = useMemo(() => {
    if (!today) return new Date().getFullYear();
    return new Date(today).getFullYear();
  }, [today]);

  const chartDataForYear = useMemo(() => {
    return toChartArray(monthlyMap, selectedYear);
  }, [monthlyMap, selectedYear]);
  const last6Months = useMemo(() => {
    return chartDataForYear.slice(-6);
  }, [chartDataForYear]);

  const chartData = useMemo(() => {
    return {
      labels: last6Months.map((m) => m.month + 1),
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgb(141, 194, 255)",
          data: last6Months?.map((m) => m.income) ?? [],
        },
        {
          label: "Expense",
          backgroundColor: "rgb(255, 106, 106)",
          data: last6Months?.map((m) => m.expense) ?? [],
        },
      ],
    };
  }, [last6Months]);

  function closeModal(e) {
    if (e.target.id === "modalBody" || e.target.id === "save") {
      setModalDisplay("none");
      setName("");
      setAmount("");
      setCurrency("JPY");
      setType("Fixed");
    } else if (e.target.id === "cardInfoBody" || e.target.id === "editSave") {
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
    async function dateApi() {
      const response = await fetch("https://api.datesapi.net/today");
      const data = await response.json();
      setToday(data.result);
    }
    dateApi();
  }, []);

  return (
    <>
      <Header setDisplay={setDisplay} />
      <Calendar
        day={day}
        month={month}
        year={year}
        setnichi={setnichi}
        today={today}
      />
      <Main
        chartData={chartData}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
        year={year}
        month={month}
        setDisplay={setDisplay}
        display={display}
        setExpenseIncome={setExpenseIncome}
        setType={setType}
        setCardDate={setCardDate}
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
        day={day}
        year={year}
        month={month}
        expenseIncome={expenseIncome}
        setCurrency={setCurrency}
        setType={setType}
        setAmount={setAmount}
        setName={setName}
        type={type}
        currency={currency}
        amount={amount}
        name={name}
        cards={cards}
        setCards={setCards}
        closeModal={closeModal}
        modalDisplay={modalDisplay}
        saveData={saveData}
        id={id}
        setId={setId}
        today={today}
        cardDate={cardDate}
      />
      <CardInfo
        expenseIncome={expenseIncome}
        cardDate={cardDate}
        setCardInfoModal={setCardInfoModal}
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
