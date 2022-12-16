import { useState, useEffect } from "react";
import { instance } from "@/api/api";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const [comanda, setComanda] = useState([]);
  const [chartComanda, setChartComanda] = useState({});

  const getComandas = async () => {
    try {
      const response = await instance.get("/comanda");
      const respuesta = response.data;
      setComanda(response.data);
      setChartComanda({
        series: [
          {
            name: respuesta,
            data: respuesta,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          colors: ["#35a2eb", "#D00000"],
          xaxis: {
            type: "string",
            categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComandas();
  }, []);


  return (
    <>
      <div>
        <h1 className="text-center font-bold">Pedidos mensuales</h1>
        {comanda.length === 0 ? (
          <h1>No hay datos</h1>
        ) : (
          <ReactApexChart options={chartComanda.options} series={chartComanda.series} />
        )}
      </div>
    </>
  );
};

export default LineChart;
