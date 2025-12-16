export default function TotalMenu(props) {
  const { cards, setDisplay } = props;
  let expense = cards.filter((card) => card.expense === "Expense");
  let income = cards.filter((card) => card.expense === "Income");
  let fixed = cards.filter((card) => card.type === "Fixed");
  let food = cards.filter((card) => card.type === "Food");
  let other = cards.filter((card) => card.type === "Other");
  function addAll(price) {
    return price.length > 0
      ? price.reduce((acc, item) => {
          const clean = Number(item.amount.replace(/,/g, ""));
          return acc + clean;
        }, 0)
      : "";
  }

  let incomeTotal = addAll(income);
  let expenseTotal = addAll(expense);
  let fixedTotal = addAll(fixed);
  let foodTotal = addAll(food);
  let otherTotal = addAll(other);
  let result = incomeTotal - expenseTotal;

  return (
    <div className="totalContainer">
      <div className="totalInfoContainer">
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
            {Number(incomeTotal).toLocaleString("en-US")}
          </div>
        </div>
        <div className="total">
          Total Expenses:
          <div style={{ color: "rgb(255, 56, 89)" }}>
            {" -"}
            {expenseTotal.toLocaleString("en-US")}
          </div>
        </div>
        <div className="total balance">
          Balace:
          <div>{result.toLocaleString("en-US")}</div>
        </div>
      </div>
    </div>
  );
}
