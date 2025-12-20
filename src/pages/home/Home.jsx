import { useEffect, useMemo, useState, useContext } from "react";
import "../../App.css";
import Main from "./Main";
import Modal from "./Modal";
import Calendar from "./header/Calendar";
import CardInfo from "./CardInfo";
import { CardsContext } from "../contex/CardsContex";

function Home() {
  const [{ month, year, day }, setnichi] = useState({
    month: 0,
    year: 0,
    day: 0,
  });

  const { setExpenseIncome, setCardInfoModal } = useContext(CardsContext);
  const [cards, setCards] = useState([]);
  const [modalDisplay, setModalDisplay] = useState("none");
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [type, setType] = useState("Fixed");
  const [today, setToday] = useState("");
  const [cardDate, setCardDate] = useState("");
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
      setType("Fixed");
    } else if (e.target.id === "cardInfoBody" || e.target.id === "editSave") {
      setCardInfoModal("none");
    }
  }

  function openModal(type) {
    setModalDisplay("flex");
    setExpenseIncome(type);
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
    const localDate = new Date().toISOString().slice(0, 10);
    setToday(localDate);
  }, []);

  return (
    <>
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
        setType={setType}
        setCardDate={setCardDate}
        cards={cards}
        openModal={openModal}
        setModalDisplay={setModalDisplay}
      />
      <Modal
        day={day}
        year={year}
        month={month}
        setType={setType}
        setAmount={setAmount}
        setName={setName}
        type={type}
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
        cardDate={cardDate}
        setCards={setCards}
        saveData={saveData}
        cards={cards}
        closeModal={closeModal}
      />
    </>
  );
}

export default Home;
