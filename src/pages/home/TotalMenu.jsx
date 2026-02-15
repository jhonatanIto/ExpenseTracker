import { Result } from "postcss";
import { useContext, useState } from "react";
import { CardsContext } from "../contex/CardsContex";
import { UserContext } from "../contex/UserContext";

export default function TotalMenu(props) {
  const {
    month,
    year,
    setTotalExpense,
    totalExpense,
    setTotalIncome,
    totalIncome,
  } = props;

  const { setDisplay } = useContext(CardsContext);
  const { cards } = useContext(UserContext);

  const [selecFilt, setSelecFilt] = useState("all");

  let expense = cards.filter(
    (card) =>
      card.type === "expense" && filterMonth(card) === `${year}-${month}`,
  );
  let income = cards.filter(
    (card) =>
      card.type === "income" && filterMonth(card) === `${year}-${month}`,
  );
  let fixed = cards.filter(
    (card) =>
      card.category === "fixed" && filterMonth(card) === `${year}-${month}`,
  );
  let food = cards.filter(
    (card) =>
      card.category === "food" && filterMonth(card) === `${year}-${month}`,
  );
  let other = cards.filter(
    (card) =>
      card.category === "other" && filterMonth(card) === `${year}-${month}`,
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
    const mont = new Date(card.created_at).getMonth();
    const yearr = new Date(card.created_at).getFullYear();
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
          onClick={() => {
            setDisplay("All");
            setSelecFilt("all");
          }}
          className="allInfo filterExpense"
          style={{
            color: `${selecFilt === "all" ? "rgb(0, 153, 255)" : "black"}`,
          }}
        >
          All
        </button>
        <div
          onClick={() => {
            setDisplay("Fixed");
            setSelecFilt("fixed");
          }}
          className="moreInfo filterExpense"
          style={{
            color: `${selecFilt === "fixed" ? "rgb(0, 153, 255)" : "black"}`,
          }}
        >
          Fixed:
          <button onClick={() => setDisplay("Fixed")} className="filterExpense">
            {Number(fixedTotal).toLocaleString("en-US")}
          </button>
        </div>
        <div
          onClick={() => {
            setDisplay("Food");
            setSelecFilt("food");
          }}
          className="moreInfo filterExpense"
          style={{
            color: `${selecFilt === "food" ? "rgb(0, 153, 255)" : "black"}`,
          }}
        >
          Food:
          <button onClick={() => setDisplay("Food")} className="filterExpense">
            {" "}
            {Number(foodTotal).toLocaleString("en-US")}
          </button>
        </div>
        <div
          onClick={() => {
            setDisplay("Other");
            setSelecFilt("other");
          }}
          className="moreInfo filterExpense"
          style={{
            color: `${selecFilt === "other" ? "rgb(0, 153, 255)" : "black"}`,
          }}
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
            {totalExpense > 0 ? " -" : ""}
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
