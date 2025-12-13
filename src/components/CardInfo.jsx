import { useEffect, useState } from "react";

export default function CardInfo(props) {
  const {
    cardInfoModal,
    closeModal,
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
    setEditCurrency,
    setEditType,
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
        <div>13/12/2025</div>
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
            style={{ appearance: arrow, cursor: cursor }}
            disabled={edit}
            className="selectInfo"
            onChange={(e) => {
              setEditCurrency(e.target.value);
            }}
            value={editCurrency}
          >
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
            <option value="REAL">REAL</option>
          </select>
          <select
            style={{ appearance: arrow, cursor: cursor }}
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
        <button onClick={() => editAll()} className="buttons edit">
          {saveOrEdit}
        </button>
        <button
          id="cardInfoBody"
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
