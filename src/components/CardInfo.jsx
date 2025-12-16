export default function CardInfo(props) {
  const {
    cardInfoModal,
    currentId,
    cards,
    saveData,
    setCards,
    setEdit,
    edit,
    setArrow,
    arrow,
    setSaveOrEdit,
    saveOrEdit,
    deleteDisplay,
    setDeleteDisplay,
    cursor,
    setCursor,
    editName,
    editAmount,
    editCurrency,
    editType,
    setEditName,
    setEditAmount,
    setEditType,
    closeModal,
    setCardInfoModal,
    date,
    expenseIncome,
  } = props;

  function editAll() {
    setEdit(false);
    setDeleteDisplay("block");
    setSaveOrEdit("Save");
    setArrow("auto");
    setCursor("pointer");
  }

  return (
    <div
      onClick={closeModal}
      id="cardInfoBody"
      style={{ display: cardInfoModal }}
      className="cardInfoBody"
    >
      <div className="cardInfoContainer">
        <div>{date}</div>
        <input
          disabled={edit}
          className="CardInfoInput "
          type="text"
          onChange={(e) => {
            setEditName(e.target.value);
          }}
          value={editName}
        />
        <input
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
              display: expenseIncome === "Income" ? "none" : "flex",
            }}
            disabled={edit}
            className="selectInfo"
            onChange={(e) => {
              setEditType(e.target.value);
            }}
            value={editType}
          >
            <option value="Fixed">Fixed</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          onClick={() => {
            if (saveOrEdit === "Edit") {
              editAll();
            } else {
              setCards((prev) => {
                const updateCard = prev.map((card) =>
                  card.id === currentId
                    ? {
                        ...card,

                        name: editName,
                        amount: editAmount,
                        currency: editCurrency,
                        type: editType,
                      }
                    : card
                );
                saveData(updateCard);
                return updateCard;
              });

              setCardInfoModal("none");
            }
          }}
          className="buttons edit"
        >
          {saveOrEdit}
        </button>
        <button
          id="editSave"
          onClick={() => {
            let updatedCards = cards.filter((card) => card.id !== currentId);
            saveData(updatedCards);
            setCards(updatedCards);
            closeModal();
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
