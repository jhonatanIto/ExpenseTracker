import AddContainer from "./AddContainer";
import Graph from "./Graph";
import TotalMenu from "./TotalMenu";

export default function Main(props) {
  const {
    openModal,
    cards,
    setCurrentId,
    setEdit,
    setArrow,
    setSaveOrEdit,
    setDeleteDisplay,
    setCursor,
    setEditName,
    setEditAmount,
    setEditCurrency,
    setEditType,
    setType,
    setExpenseIncome,
    display,
    setDisplay,
    month,
    year,
    setCardDate,
  } = props;
  return (
    <div className="main">
      <AddContainer {...props} />
      <TotalMenu {...props} />
      <Graph />
    </div>
  );
}
