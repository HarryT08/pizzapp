import React from "react";
import { Line } from "react-chartjs-2";
import { dataLinePopular } from "../../data/datos";
import {
    Chart as ChartJS,
    registerables,
  } from "chart.js";
  import { Chart } from "react-chartjs-2";
  import { useState } from "react";
  ChartJS.register(...registerables);

const LinesCharts = () => {
  const [data] = useState(dataLinePopular[0]);

  const options = {
    plugins: {
        title: {
            display: true,
            text: 'Mas vendidos y menos vendidos',
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

export default LinesCharts;
