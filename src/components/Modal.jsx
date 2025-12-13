export default function Modal(props) {
  const {
    modalDisplay,
    closeModal,
    expenseIncome,
    setCards,
    saveData,
    id,
    setId,
    today,
    name,
    type,
    amount,
    currency,
    setName,
    setAmount,
    setCurrency,
    setType,
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
          className="modalInput inputName"
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="modalInput"
          placeholder="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="selectContainer">
          <select
            onChange={(e) => setCurrency(e.target.value)}
            className="select"
            value={currency}
          >
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
            <option value="REAL">REAL</option>
          </select>
          <select
            onChange={(e) => setType(e.target.value)}
            style={{ display: expenseIncome === "Expense" ? "flex" : "none" }}
            className="select"
            value={type}
          >
            <option value="Fixed">Fixed</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div
          id="save"
          onClick={() => {
            if (name !== "" && amount !== "") {
              let newCard = {
                name: name,
                amount: amount,
                currency: currency,
                type: type,
                expense: expenseIncome,
                date: today || "loading",
                id: id,
              };

              setCards((prev) => {
                const updated = [...prev, newCard];
                saveData(updated);
                return updated;
              });

              setName("");
              setAmount("");
              setCurrency("JPY");
              setType("Fixed");
              setId((prev) => prev + 1);
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
