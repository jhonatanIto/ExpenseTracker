import Cards from "./Cards";
import plus from "../assets/plus (1).png";

export default function AddContainer(props) {
  const {
    openModal,
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
    setCardDate,
    setExpenseIncome,
    setType,
    display,
    month,
    year,
  } = props;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="addButtContainer">
        <button
          onClick={() => openModal("Expense")}
          id="expense"
          className="addButt gasto"
        >
          Expense <img className="plus" src={plus} />
        </button>
        <button
          onClick={() => {
            openModal("Income");
            setType("");
          }}
          id="income"
          className="addButt renda"
        >
          Income <img className="plus" src={plus} />
        </button>
      </div>
      <div className="cardsContainer">
        <Cards {...props} />
      </div>
    </div>
  );
}
