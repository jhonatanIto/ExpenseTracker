import { useState } from "react";

export default function CardInfo(props) {
  const { cardInfoModal, closeModal } = props;
  const [deleteDisplay, setDeleteDisplay] = useState("none");
  const [edit, setEdit] = useState(true);
  const [saveOrEdit, setSaveOrEdit] = useState("Edit");
  const [arrow, setArrow] = useState("none");
  function editAll() {
    setEdit(false);
    setDeleteDisplay("block");
    setSaveOrEdit("Save");
    setArrow("auto");
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
          value={"Aluguel"}
        />
        <input
          disabled={edit}
          className="CardInfoInput"
          type="number"
          value={46200}
        />
        <div className="selectContainer">
          <select
            style={{ appearance: arrow }}
            disabled={edit}
            className="selectInfo"
          >
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
            <option value="REAL">REAL</option>
          </select>
          <select
            style={{ appearance: arrow }}
            disabled={edit}
            className="selectInfo"
          >
            <option value="Fixed">Fixed</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button onClick={() => editAll()} className="buttons edit">
          {saveOrEdit}
        </button>
        <button style={{ display: deleteDisplay }} className="buttons del">
          Delete
        </button>
      </div>
    </div>
  );
}
