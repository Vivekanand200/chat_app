import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    plugins,
} from 'chart.js'
import { getLast7Days } from '../../lib/feature';

ChartJS.register(
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
)

const labels = getLast7Days();

const LineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    cutout:110,
}
const LineChart = ({ value = [] }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                data: value,
                label: "Messages",
                fill: true,
                backgroundColor: "rgba(75,12,192,0.2)",
                borderColor: "rgba(75,12,192,1)"
            }]
    }
    return <Line data={data} options={LineChartOptions} />
}
const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                data: value,
                label: "Total Chats vs Group Chats",

                backgroundColor: ["rgba(75,12,192,0.2)", "orange"],
                borderColor: ["rgba(75,12,192,1)", "orange"],
                offset: 0,
            }]
    }
    return (
        <Doughnut style={{
            zIndex: 10
        }} data={data} options={doughnutChartOptions} />
    )
}

export { DoughnutChart, LineChart };