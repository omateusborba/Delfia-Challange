// src/components/BarChart.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registre os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const BarChart = () => {
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Vendas',
                data: [150, 200, 180, 220, 250, 150],
                backgroundColor: '#153d64',
            },
            {
                label: 'Clientes',
                data: [30, 50, 80, 66, 70, 90],
                backgroundColor: '#1587b8'
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return <Bar data={data} options={options} />;
};
