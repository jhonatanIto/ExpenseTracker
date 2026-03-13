import Cards from "./Cards";
import plus from "../../assets/plus (1).png";
import { useContext } from "react";
import { UserContext } from "../contex/UserContext";
import { v4 as uuid } from "uuid";

export default function AddContainer(props) {
  const { openModal, month, year, formattedDate } = props;

  const { user, cards, setCards, token, loadCards } = useContext(UserContext);
  console.log(token);

  const postAllFixed = async () => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const currentDate = `${year}-${formattedMonth}`;

    const uniqueFixed = [];
    const seenNames = new Set();

    for (const ca of cards) {
      if (ca.category === "fixed" && !seenNames.has(ca.name)) {
        seenNames.add(ca.name);
        uniqueFixed.push(ca);
      }
    }

    const filteredFixed = uniqueFixed.filter((c) => {
      const alreadyExists = cards.some((existing) => {
        const [ey, em] = existing.created_at.split("-");
        const existingDate = `${ey}-${em}`;

        return existing.name === c.name && existingDate === currentDate;
      });

      return !alreadyExists;
    });

    if (filteredFixed.length === 0) return;

    if (!user) {
      const visitorFixedCards = filteredFixed.map((c) => ({
        name: c.name,
        amount: c.amount,
        type: c.type,
        category: c.category,
        created_at: formattedDate,
        id: uuid(),
      }));

      setCards((prev) => {
        const allCards = [...prev, ...visitorFixedCards];

        localStorage.setItem("Expenses", JSON.stringify(allCards));
        return allCards;
      });

      return;
    }

    const newCards = filteredFixed.map((c) => ({
      name: c.name,
      amount: c.amount,
      type: c.type,
      category: c.category,
      created_at: formattedDate,
    }));

    try {
      const res = await fetch(
        "https://expensebackend-production-799f.up.railway.app/api/cards/bulk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fixedCards: newCards }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      await loadCards();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="leftAllContainer">
      <div className="addButtContainer">
        <button
          className="allFixedButt"
          onClick={async () => {
            await postAllFixed();
          }}
        >
          <div className="fixDesk">Add all Fixed</div>
          <div className="fixMobile">All Fixed</div>
        </button>
        <button
          onClick={() => {
            openModal("expense");
          }}
          id="expense"
          className="addButt gasto"
        >
          Expense <img className="plus" src={plus} />
        </button>
        <button
          onClick={() => {
            openModal("income");
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
