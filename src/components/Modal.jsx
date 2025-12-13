export default function Modal(props) {
  const {
    modalDisplay,
    closeModal,
    expenseIncome,
    setCards,
    saveData,
    id,
    setId,
    cards,
  } = props;

  return (
    <div
      id="modalBody"
      onClick={closeModal}
      style={{ display: modalDisplay }}
      className="modalBody"
    >
      <div className="modalCard">
        <div
          style={{
            color:
              expenseIncome === "Expense"
                ? "rgb(255, 106, 106)"
                : "rgb(69, 214, 69)",
          }}
          className="cardTitle "
        >
          {expenseIncome}
        </div>
        <input
          id="nameInput"
          className="modalInput inputName"
          placeholder="name"
          type="text"
        />

        <input
          id="amountInput"
          className="modalInput"
          placeholder="amount"
          type="number"
        />
        <div className="selectContainer">
          <select id="selecCurrency" className="select">
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
            <option value="REAL">REAL</option>
          </select>
          <select
            id="selecType"
            style={{ display: expenseIncome === "Expense" ? "flex" : "none" }}
            className="select"
          >
            <option value="Fixed">Fixed</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div
          id="save"
          onClick={() => {
            let name = document.getElementById("nameInput");
            let currency = document.getElementById("selecCurrency");
            let amount = document.getElementById("amountInput");
            let type = document.getElementById("selecType");
            if (name.value !== "" && amount.value !== "") {
              let newCard = {
                name: name.value,
                amount: amount.value,
                currency: currency.value,
                type: type.value,
                expense: expenseIncome,
                date: "2025",
                id: id,
              };

              setCards((prev) => {
                const updated = [...prev, newCard];
                saveData(updated);
                return updated;
              });

              name.value = "";
              amount.value = "";
              setId((prev) => prev + 1);
              console.log(cards);
            }
          }}
          className="modalSave"
        >
          save
        </div>
      </div>
    </div>
  );
}
