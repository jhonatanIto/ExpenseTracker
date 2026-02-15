import { useEffect, useMemo, useState, useContext } from "react";
import "../../App.css";
import Main from "./Main";
import Modal from "./Modal";
import Calendar from "./header/Calendar";
import CardInfo from "./CardInfo";
import { CardsContext } from "../contex/CardsContex";
import { UserContext } from "../contex/UserContext";

function Home() {
  const [{ month, year, day }, setnichi] = useState({
    month: 0,
    year: 0,
    day: 0,
  });

  const { setExpenseIncome, setCardInfoModal } = useContext(CardsContext);
  const [fixedCards, setFixedCards] = useState([]);
  const [modalDisplay, setModalDisplay] = useState("none");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("fixed");
  const [today, setToday] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [totalExpense, setTotalExpense] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [formattedDate, setFormattedDate] = useState("");

  const { cards } = useContext(UserContext);

  function monthlyTotal(cardss) {
    const map = {};

    cardss.forEach((card) => {
      const date = new Date(card.created_at);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!map[year]) {
        map[year] = {};
      }
      if (!map[year][month]) {
        map[year][month] = { income: 0, expense: 0 };
      }

      if (card.type === "income") {
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
    return chartDataForYear.slice(0);
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

  function closeModal() {
    setModalDisplay("none");
    setName("");
    setAmount("");
    setCategory("fixed");
  }

  function closeEditModal() {
    setCardInfoModal("none");
  }

  function openModal(type) {
    setModalDisplay("flex");
    setExpenseIncome(type);
  }

  function saveData(cards, storage) {
    localStorage.setItem(storage, JSON.stringify(cards));
    localStorage.setItem(storage, JSON.stringify(cards));
  }

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
        saveData={saveData}
        setFixedCards={setFixedCards}
        formattedDate={formattedDate}
        chartData={chartData}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
        year={year}
        month={month}
        setCategory={setCategory}
        setCardDate={setCardDate}
        fixedCards={fixedCards}
        openModal={openModal}
        setModalDisplay={setModalDisplay}
      />
      <Modal
        formattedDate={formattedDate}
        setFormattedDate={setFormattedDate}
        setFixedCards={setFixedCards}
        day={day}
        year={year}
        month={month}
        setCategory={setCategory}
        setAmount={setAmount}
        setName={setName}
        category={category}
        amount={amount}
        name={name}
        closeModal={closeModal}
        modalDisplay={modalDisplay}
        saveData={saveData}
        today={today}
        cardDate={cardDate}
      />
      <CardInfo
        cardDate={cardDate}
        saveData={saveData}
        closeEditModal={closeEditModal}
      />
    </>
  );
}

export default Home;
