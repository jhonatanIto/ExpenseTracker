import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Graph({ chartData }) {
  console.log(chartData);
  if (!chartData || !chartData.labels) return <p>no data</p>;

  return (
    <div className="graph">
      <Bar data={chartData} />
    </div>
  );
}
