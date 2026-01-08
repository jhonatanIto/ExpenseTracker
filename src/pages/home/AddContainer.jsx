import Cards from "./Cards";
import plus from "../../assets/plus (1).png";

export default function AddContainer(props) {
  const {
    openModal,
    cards,
    setType,
    month,
    year,
    fixedCards,
    setCards,
    formattedDate,
    setFixedCards,
    saveData,
    addAllFixed,
  } = props;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="addButtContainer">
        <button
          className="allFixedButt"
          onClick={() => {
            fixedCards.map((f) => addAllFixed(f));
          }}
        >
          Add all Fixed
        </button>
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
