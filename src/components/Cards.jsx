export default function Cards(props) {
  const {
    cards,
    openCardInfo,
    setCurrentId,
    setEdit,
    setArrow,
    setSaveOrEdit,
    setDeleteDisplay,
    setCursor,
    setEditName,
    setEditAmount,
    setEditCurrency,
    setEditType,
    setDate,
    setExpenseIncome,
    display,
  } = props;

  let displayThis =
    display === "All"
      ? cards
      : display === "Fixed"
      ? cards.filter((card) => card.type === "Fixed")
      : display === "Food"
      ? cards.filter((card) => card.type === "Food")
      : display === "Other"
      ? cards.filter((card) => card.type === "Other")
      : cards;
  console.log(display);
  return (
    <>
      {displayThis.map((card, index) => {
        return (
          <div
            onClick={() => {
              openCardInfo();
              setCurrentId(card.id);
              setEdit(true);
              setArrow("none");
              setSaveOrEdit("Edit");
              setDeleteDisplay("none");
              setCursor("default");
              setEditName(card.name);
              setEditAmount(card.amount);
              setEditCurrency(card.currency);
              setEditType(card.type);
              setDate(card.date);
              setExpenseIncome(card.expense);
            }}
            key={index}
            className="cardBox"
          >
            <div>{card.name}</div>
            <div
              style={{
                color:
                  card.expense === "Expense"
                    ? "rgb(255, 56, 89)"
                    : "rgb(69, 214, 69)",
              }}
              className="cardGasto"
            >
              {card.expense === "Expense" ? "- " : ""}
              {Number(card.amount).toLocaleString("en-US")}
            </div>
          </div>
        );
      })}
    </>
  );
}
