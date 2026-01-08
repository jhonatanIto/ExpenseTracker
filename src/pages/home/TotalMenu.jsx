import { Result } from "postcss";
import { useContext } from "react";
import { CardsContext } from "../contex/CardsContex";

export default function TotalMenu(props) {
  const {
    cards,
    month,
    year,
    setTotalExpense,
    totalExpense,
    setTotalIncome,
    totalIncome,
  } = props;

  const { setDisplay } = useContext(CardsContext);
  let expense = cards.filter(
    (card) =>
      card.expense === "Expense" && filterMonth(card) === `${year}-${month}`
  );
  let income = cards.filter(
    (card) =>
      card.expense === "Income" && filterMonth(card) === `${year}-${month}`
  );
  let fixed = cards.filter(
    (card) => card.type === "Fixed" && filterMonth(card) === `${year}-${month}`
  );
  let food = cards.filter(
    (card) => card.type === "Food" && filterMonth(card) === `${year}-${month}`
  );
  let other = cards.filter(
    (card) => card.type === "Other" && filterMonth(card) === `${year}-${month}`
  );
  function addAll(price) {
    return price.length > 0
      ? price.reduce((acc, item) => {
          const clean = Number(item.amount.replace(/,/g, ""));
          return acc + clean;
        }, 0)
      : "";
  }

  function filterMonth(card) {
    const mont = new Date(card.date).getMonth();
    const yearr = new Date(card.date).getFullYear();
    return `${yearr}-${mont}`;
  }

  setTotalExpense(addAll(expense));
  setTotalIncome(addAll(income));

  let fixedTotal = addAll(fixed);
  let foodTotal = addAll(food);
  let otherTotal = addAll(other);
  let result = totalIncome - totalExpense;

  return (
    <div className="totalContainer">
      <div className="totalInfoContainer">
        <button
          onClick={() => setDisplay("All")}
          className="allInfo filterExpense"
        >
          All
        </button>
        <div
          onClick={() => setDisplay("Fixed")}
          className="moreInfo filterExpense"
        >
          Fixed:
          <button onClick={() => setDisplay("Fixed")} className="filterExpense">
            {Number(fixedTotal).toLocaleString("en-US")}
          </button>
        </div>
        <div
          onClick={() => setDisplay("Food")}
          className="moreInfo filterExpense"
        >
          Food:
          <button onClick={() => setDisplay("Food")} className="filterExpense">
            {" "}
            {Number(foodTotal).toLocaleString("en-US")}
          </button>
        </div>
        <div
          onClick={() => setDisplay("Other")}
          className="moreInfo filterExpense"
        >
          Other:
          <button onClick={() => setDisplay("Other")} className="filterExpense">
            {Number(otherTotal).toLocaleString("en-US")}
          </button>
        </div>
      </div>
      <div className="totalBox">
        <div className="total">
          Total Income:
          <div style={{ color: "rgb(0, 153, 255)" }}>
            {" "}
            {Number(totalIncome).toLocaleString("en-US")}
          </div>
        </div>
        <div className="total">
          Total Expenses:
          <div style={{ color: "rgb(255, 56, 89)" }}>
            {" -"}
            {Number(totalExpense).toLocaleString("en-US")}
          </div>
        </div>
        <div className="total balance">
          Balance:
          <div>{Number(result).toLocaleString("en-US")}</div>
        </div>
      </div>
    </div>
  );
}
