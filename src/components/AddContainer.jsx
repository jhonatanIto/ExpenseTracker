import Cards from "./Cards";

export default function AddContainer(props) {
  const { openModal, cards, openCardInfo } = props;

  return (
    <div>
      <div className="addButtContainer">
        <button
          onClick={() => openModal("Expense")}
          id="expense"
          className="addButt gasto"
        >
          Expense <img className="plus" src="src\assets\plus (1).png" />
        </button>
        <button
          onClick={() => openModal("Income")}
          id="income"
          className="addButt renda"
        >
          Income <img className="plus" src="src\assets\plus (1).png" />
        </button>
      </div>
      <div className="cardsContainer">
        <Cards {...props} />
      </div>
    </div>
  );
}
