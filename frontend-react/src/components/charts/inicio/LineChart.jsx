import { useState, useEffect } from 'react';
import { instance } from '@/api/api';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const [comandas, setComandas] = useState([]);
  const [chartComandas, setChartComandas] = useState({});

  const getComandas = async () => {
    try {
      const response = await instance.get('/comanda');
      const respuesta = response.data;

      setComandas(response.data);

      let months = {};
      const monthsNumbers = [6, 7, 8, 9, 10, 11];

      respuesta.forEach((comanda) => {
        const month = new Date(comanda.fecha).getMonth();

        if (!months[month]) {
          months[month] = 0;
        }

        months[month] += 1;
      });

      const monthsArray = monthsNumbers.map((n) => months[n] || 0);

      setChartComandas({
        series: [
          {
            name: 'Pedidos',
            data: monthsArray
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          colors: ['#35a2eb', '#D00000'],
          xaxis: {
            type: 'string',
            categories: [
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre'
            ]
          }
        }
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
        {comandas.length === 0 ? (
          <h1>No hay datos</h1>
        ) : (
          <ReactApexChart
            options={chartComandas.options}
            series={chartComandas.series}
          />
        )}
      </div>
    </>
  );
};

export default LineChart;
