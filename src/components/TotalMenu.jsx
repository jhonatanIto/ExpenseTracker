import { Result } from "postcss";

export default function TotalMenu(props) {
  const {
    cards,
    setDisplay,
    month,
    setTotalExpense,
    totalExpense,
    setTotalIncome,
    totalIncome,
  } = props;
  let expense = cards.filter(
    (card) => card.expense === "Expense" && filterMonth(card) === month
  );
  let income = cards.filter(
    (card) => card.expense === "Income" && filterMonth(card) === month
  );
  let fixed = cards.filter(
    (card) => card.type === "Fixed" && filterMonth(card) === month
  );
  let food = cards.filter(
    (card) => card.type === "Food" && filterMonth(card) === month
  );
  let other = cards.filter(
    (card) => card.type === "Other" && filterMonth(card) === month
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
    return new Date(card.date).getMonth();
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
        <div
          onClick={() => setDisplay("All")}
          className="allInfo filterExpense"
        >
          All
        </div>
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
          <div style={{ color: "rgb(69, 214, 69)" }}>
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
          Balace:
          <div>{Number(result).toLocaleString("en-US")}</div>
        </div>
      </div>
    </div>
  );
}
