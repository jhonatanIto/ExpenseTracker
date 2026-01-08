import { useContext } from "react";
import { CardsContext } from "../contex/CardsContex";

export default function Cards(props) {
  const {
    cards,
    month,
    year,
    fixedCards,
    setFixedCards,
    saveData,
    addAllFixed,
  } = props;
  const {
    display,
    setCurrentId,
    setEdit,
    setArrow,
    setSaveOrEdit,
    setDeleteDisplay,
    setCursor,
    setEditName,
    setEditAmount,
    setEditType,
    setCardDate,
    setExpenseIncome,
    openCardInfo,
  } = useContext(CardsContext);

  const displayMonth = cards?.filter((c) => {
    const m = new Date(c.date).getMonth();
    const y = new Date(c.date).getFullYear();
    return m === month && y === year;
  });

  let displayThis =
    display === "All"
      ? displayMonth
      : display === "Fixed"
      ? displayMonth.filter((card) => card.type === "Fixed")
      : display === "Food"
      ? displayMonth.filter((card) => card.type === "Food")
      : display === "Other"
      ? displayMonth.filter((card) => card.type === "Other")
      : displayMonth;

  let displayFixed = fixedCards?.filter((c) => {
    return !c.hiddenIn?.includes(`${year}-${month}`);
  });

  return (
    <>
      {displayFixed?.map((card, index) => {
        return (
          <div className="fixedFlex">
            <button
              style={{ display: card.type === "Fixed" ? "flex" : "none" }}
              className="fixedButt"
              onClick={() => {
                setFixedCards((prev) => {
                  const updateFixedCards = prev.filter(
                    (c) => c.name !== card.name
                  );
                  saveData(updateFixedCards, "fixedCards");
                  return updateFixedCards;
                });
              }}
            >
              x
            </button>
            <button
              style={{ display: card.type === "Fixed" ? "flex" : "none" }}
              className="fixedButt"
              onClick={() => {
                addAllFixed(card);
              }}
            >
              +
            </button>
            <button
              key={index}
              className="cardBox"
              style={{ transform: "none", cursor: "default" }}
            >
              <div>{card.name}</div>
              <div
                style={{
                  color:
                    card.expense === "Expense"
                      ? "rgb(255, 56, 89)"
                      : "rgb(0, 153, 255)",
                }}
                className="cardGasto"
              >
                {card.expense === "Expense" ? "- " : ""}
                {Number(card.amount).toLocaleString("en-US")}
              </div>
            </button>
          </div>
        );
      })}
      {displayThis.map((card, index) => {
        return (
          <div>
            <button
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
                setEditType(card.type);
                setCardDate(card.date);
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
                      : "rgb(0, 153, 255)",
                }}
                className="cardGasto"
              >
                {card.expense === "Expense" ? "- " : ""}
                {Number(card.amount).toLocaleString("en-US")}
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
}
