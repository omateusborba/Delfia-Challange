import { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraficoPizzaCliente = () => {
    const [labels, setLabels] = useState([]);
    const [valores, setValores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/relatorios/clientes-top")
            .then(res => {
                const dados = res.data;
                setLabels(dados.map(p => p.cliente));
                setValores(dados.map(p => p.total));
            })
            .catch(err => console.error("Erro ao carregar gráfico:", err));
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "Clientes",
                data: valores,
                backgroundColor: ["#54a0ff", "#00f6f6ff", "#0245baff", "#008d81ff", "#7e98ffff"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Clientes Que Mais Compram" },
        },
    };

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <Pie data={data} options={options} />
        </div>
    );
};
