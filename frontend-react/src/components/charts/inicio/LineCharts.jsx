import { useState } from "react";
import  ReactApexChart from "react-apexcharts";

const LineCharts = () => {
    const [state, setState] = useState({
        series: [
            {
                name: "Agosto",
                data: [210, 220, 300, 2100, 500, 600, 700],
            },
            {
                name: "Septiembre",
                data: [110, 210, 230, 1000, 250, 260, 270],
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
                categories: [
                    "HambEs",
                    "HambS",
                    "PizzaM",
                    "PizzaB",
                    "PizzaMM",
                    "PiazzaP",
                    "PizaaBbq",
                ],
            }
        },
    });

    return (
        <div>
            <h1 className="text-center font-bold">Productos mas y menos vendidos</h1>
            <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </div>
    );
};

export default LineCharts;
