import { useContext } from "react";
import { CardsContext } from "../contex/CardsContex";
import { UserContext } from "../contex/UserContext";

export default function Cards(props) {
  const { month, year } = props;
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

  const { cards } = useContext(UserContext);

  const displayMonth = cards?.filter((c) => {
    const m = new Date(c.created_at).getMonth();
    const y = new Date(c.created_at).getFullYear();
    return m === month && y === year;
  });

  let displayThis =
    display === "All"
      ? displayMonth
      : display === "Fixed"
        ? displayMonth.filter((card) => card.category === "fixed")
        : display === "Food"
          ? displayMonth.filter((card) => card.category === "food")
          : display === "Other"
            ? displayMonth.filter((card) => card.category === "other")
            : displayMonth;

  return (
    <>
      {displayThis.map((card, index) => {
        return (
          <div key={index}>
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
                setEditType(card.category);
                setCardDate(card.created_at);
                setExpenseIncome(card.type);
              }}
              key={index}
              className="cardBox"
            >
              <div>{card.name}</div>
              <div
                style={{
                  color:
                    card.type === "expense"
                      ? "rgb(255, 56, 89)"
                      : "rgb(0, 153, 255)",
                }}
                className="cardGasto"
              >
                {card.type === "expense" ? "- " : ""}
                {Number(card.amount).toLocaleString("en-US")}
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
}
