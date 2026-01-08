import AddContainer from "./AddContainer";
import Graph from "./Graph";
import TotalMenu from "./TotalMenu";

export default function Main(props) {
  const {
    openModal,
    cards,
    setCards,
    fixedCards,
    setType,
    month,
    year,
    setTotalExpense,
    totalExpense,
    setTotalIncome,
    totalIncome,
    chartData,
    formattedDate,
    setFixedCards,
    id,
    setId,
    saveData,
  } = props;
  return (
    <div className="main">
      <AddContainer {...props} />
      <TotalMenu {...props} />
      <Graph {...props} />
    </div>
  );
}
