import { Line } from "react-chartjs-2";
import {dataLineChart} from '../../data/datos'
import {
  Chart as ChartJS,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useState } from "react";
ChartJS.register(...registerables);

const LineChart = () => {
  const [data] = useState(dataLineChart[0]);

  const options = {
    plugins: {
        title: {
            display: true,
            text: 'Grafica mensual de pedidos',
        }
    }
  }
  return (
    <>
      <div>
        <Line data={data} options={options}/>
      </div>
    </>
  );
};

export default LineChart;
