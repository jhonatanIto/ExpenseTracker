import { useContext, useEffect } from "react";
import { CardsContext } from "../contex/CardsContex";
import { v4 as uuid } from "uuid";
import { UserContext } from "../contex/UserContext";

export default function Modal(props) {
  const {
    modalDisplay,
    closeModal,
    saveData,
    name,
    category,
    amount,
    setName,
    setAmount,
    setCategory,
    month,
    year,
    day,
    setFormattedDate,
    formattedDate,
  } = props;

  const { expenseIncome } = useContext(CardsContext);
  const { token, setCards, user, loadCards } = useContext(UserContext);

  useEffect(() => {
    setFormattedDate(
      [
        year,
        String(month + 1).padStart(2, "0"),
        String(day).padStart(2, "0"),
      ].join("-"),
    );
  }, [year, month, day]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addCard();
      closeModal();
    }
  }

  const postCardData = async () => {
    if (!user) return;
    if (!name || !amount || !expenseIncome) return;
    let newCard = {
      name,
      amount,
      type: expenseIncome,
      category,
      created_at: formattedDate,
    };

    try {
      const res = await fetch("http://localhost:3000/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCard),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // adds a new card to the screen and localStorage
  function addCard() {
    if (!name || !amount) return;

    const categoryExpense = expenseIncome === "expense" ? category : null;

    let newCard = {
      name,
      amount,
      type: expenseIncome,
      category: categoryExpense,
      created_at: formattedDate,
      id: uuid(),
    };

    setCards((prev) => {
      const updated = [...prev, newCard];
      saveData(updated, "Expenses");
      return updated;
    });
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
              expenseIncome === "expense"
                ? "rgb(255, 106, 106)"
                : "rgb(69, 214, 69)",
          }}
          className="cardTitle "
        >
          {expenseIncome[0].toUpperCase() + expenseIncome.slice(1)}
        </div>
        <input
          onKeyDown={handleKeyDown}
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
            onChange={(e) => setCategory(e.target.value)}
            style={{ display: expenseIncome === "expense" ? "flex" : "none" }}
            className="select"
            value={category}
          >
            <option value="fixed">Fixed</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div
          id="save"
          onClick={async () => {
            if (user) {
              await postCardData();
              await loadCards();
            } else {
              addCard();
            }
            closeModal();
          }}
          className="modalSave"
        >
          save
        </div>
      </div>
    </div>
  );
}
