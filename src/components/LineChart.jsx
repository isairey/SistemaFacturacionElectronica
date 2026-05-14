/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center", margin: 0}}>Ventas del mes</h2>
      <Line
      style={{ marginBottom: "2rem" }}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;