import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
    const [state, setState] = useState({
        series: [
            {
                name: "Agosto",
                data: [210, 220, 300, 2100, 500, 600, 700],
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
                categories: ["En", "Feb", "Marz", "Abril", "May", "Jun", "Jul"],
            },
        },
    });
    return (
        <>
            <div>
                <h1 className="text-center font-bold">Pedidos mensuales</h1>
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="area"
                    height={350}
                />
            </div>
        </>
    );
};

export default LineChart;
