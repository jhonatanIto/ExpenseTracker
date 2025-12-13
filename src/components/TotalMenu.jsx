export default function TotalMenu(props) {
  const { cards } = props;
  let expense = cards.filter((card) => card.expense === "Expense");
  let income = cards.filter((card) => card.expense === "Income");
  let incomeTotal = income.length > 0 ? income[0].amount : "";

  let expenseTotal =
    expense.length > 0
      ? expense.reduce((acc, item) => {
          const clean = Number(item.amount.replace(/,/g, ""));
          return acc + clean;
        }, 0)
      : "";
  let result = Number(incomeTotal.replace(/,/g, "")) - expenseTotal;

  return (
    <div className="totalContainer">
      <div className="totalBox">
        <div className="total">
          Total Income:
          <div style={{ color: "rgb(69, 214, 69)" }}> {incomeTotal}</div>
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
