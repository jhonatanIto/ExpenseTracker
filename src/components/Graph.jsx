import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import sourceData from "./data/SourceData";

export default function Graph() {
  const data = {
    labels: sourceData.map((data) => data.label),
    datasets: [
      {
        label: "Expenses",
        data: sourceData.map((data) => data.Expense),
        backgroundColor: sourceData.map((data) => data.expenseBackground),
      },
      {
        label: "Income",
        data: sourceData.map((data) => data.Income),
        backgroundColor: sourceData.map((data) => data.incomeBackground),
      },
    ],
  };
  return (
    <div className="graph">
      <div>
        <Bar data={data} />
      </div>
    </div>
  );
}
