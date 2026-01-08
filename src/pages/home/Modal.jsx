import { useContext, useEffect } from "react";
import { CardsContext } from "../contex/CardsContex";
import { v4 as uuid } from "uuid";

export default function Modal(props) {
  const {
    modalDisplay,
    closeModal,
    setCards,
    saveData,
    id,
    setId,
    name,
    type,
    amount,
    setName,
    setAmount,
    setType,
    month,
    year,
    day,
    setFixedCards,
    setFormattedDate,
    formattedDate,
  } = props;

  const { expenseIncome } = useContext(CardsContext);

  useEffect(() => {
    setFormattedDate(
      [
        year,
        String(month + 1).padStart(2, "0"),
        String(day).padStart(2, "0"),
      ].join("-")
    );
  }, [year, month, day]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addCard();
      closeModal();
    }
  }

  // adds a new card to the screen and localStorage
  function addCard() {
    if (name !== "" && amount !== "") {
      let newCard = {
        name: name,
        amount: amount,
        type: type,
        expense: expenseIncome,
        date: formattedDate,
        id: uuid(),
      };

      setCards((prev) => {
        const updated = [...prev, newCard];
        saveData(updated, "Expenses");
        return updated;
      });
      if (type === "Fixed") {
        setFixedCards((prev) => {
          const fixedCard = {
            ...newCard,
            hiddenIn: [`${year}-${month}`],
          };
          const allFixed = [...prev, fixedCard];
          saveData(allFixed, "fixedCards");
          return allFixed;
        });
      }

      setName("");
      setAmount("");
      setType("Fixed");
      setId((prev) => prev + 1);
      closeModal();
    }
  }

  return (
    <div
      id="modalBody"
      onClick={closeModal}
      style={{ display: modalDisplay }}
      className="modalBody"
    >
      <div onClick={(e) => e.stopPropagation()} className="modalCard">
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
          className="dateInput"
          type="date"
          value={formattedDate}
          onChange={(e) => {
            setFormattedDate(e.target.value);
          }}
        />
        <input
          onKeyDown={handleKeyDown}
          className="modalInput inputName"
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          onKeyDown={handleKeyDown}
          className="modalInput"
          placeholder="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="selectContainer">
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
            addCard();
          }}
          className="modalSave"
        >
          save
        </div>
      </div>
    </div>
  );
}
