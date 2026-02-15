import { useContext, useEffect } from "react";
import { CardsContext } from "../contex/CardsContex";
import { UserContext } from "../contex/UserContext";
import { deleteCard, fetchCards } from "../utils/fetchData";

export default function CardInfo(props) {
  const { closeEditModal } = props;

  const {
    cardDate,
    cardInfoModal,
    setEdit,
    setDeleteDisplay,
    setSaveOrEdit,
    setArrow,
    setCursor,
    edit,
    setEditName,
    editName,
    setEditAmount,
    arrow,
    cursor,
    editAmount,
    expenseIncome,
    setEditType,
    editType,
    saveOrEdit,
    currentId,
    deleteDisplay,
  } = useContext(CardsContext);

  const { setCards, token, user } = useContext(UserContext);

  function editAll() {
    setEdit(false);
    setDeleteDisplay("block");
    setSaveOrEdit("Save");
    setArrow("auto");
    setCursor("pointer");
  }

  const visitorCardUpdate = () => {
    setCards((prev) => {
      const upCards = prev.map((c) => {
        if (c.id === currentId) {
          return {
            ...c,
            name: editName,
            amount: editAmount,
            category: editType,
          };
        }
        return c;
      });

      localStorage.setItem("Expenses", JSON.stringify(upCards));
      return upCards;
    });
  };
  const visitorCardDelete = () => {
    setCards((prev) => {
      const newArray = prev.filter((c) => c.id !== currentId);
      localStorage.setItem("Expenses", JSON.stringify(newArray));
      return newArray;
    });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      updateCard();
      closeEditModal();
      console.log("clicou enter");
    }
  }

  const updateCard = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/cards/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          amount: editAmount,
          category: editType,
          type: expenseIncome,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCards = async () => {
    if (!token) return;

    const cardData = await fetchCards(token);
    if (!cardData) {
      setCards([]);
    } else {
      setCards(cardData);
    }

    if (cardData) localStorage.setItem("Expenses", JSON.stringify(cardData));
  };

  useEffect(() => {
    let saved = localStorage.getItem("Expenses");
    if (saved) setCards(JSON.parse(saved) || []);
  }, []);

  useEffect(() => {
    if (!token) return;
    loadCards();
  }, [token]);

  return (
    <div
      onClick={closeEditModal}
      id="cardInfoBody"
      style={{ display: cardInfoModal }}
      className="cardInfoBody"
    >
      <div onClick={(e) => e.stopPropagation()} className="cardInfoContainer">
        <div>{cardDate}</div>
        <input
          onKeyDown={handleKeyDown}
          disabled={edit}
          className="CardInfoInput "
          type="text"
          onChange={(e) => {
            setEditName(e.target.value);
          }}
          value={editName}
        />
        <input
          onKeyDown={handleKeyDown}
          disabled={edit}
          className="CardInfoInput"
          type="number"
          onChange={(e) => {
            setEditAmount(e.target.value);
          }}
          value={editAmount}
        />
        <div className="selectContainer">
          <select
            style={{
              appearance: arrow,
              cursor: cursor,
              display: expenseIncome === "income" ? "none" : "flex",
            }}
            disabled={edit}
            className="selectInfo"
            onChange={(e) => {
              setEditType(e.target.value);
            }}
            value={editType}
          >
            <option value="fixed">Fixed</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          onClick={async () => {
            if (saveOrEdit === "Edit") {
              editAll();
            } else {
              if (user) {
                await updateCard();
                await loadCards();
              } else {
                visitorCardUpdate();
              }
              closeEditModal();
            }
          }}
          className="buttons edit"
        >
          {saveOrEdit}
        </button>
        <button
          id="editSave"
          onClick={async () => {
            if (user) {
              await deleteCard(token, currentId);
              await loadCards();
            } else {
              visitorCardDelete();
            }
            closeEditModal();
          }}
          style={{ display: deleteDisplay }}
          className="buttons del"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
