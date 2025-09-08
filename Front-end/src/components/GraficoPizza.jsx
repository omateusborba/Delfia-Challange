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

export const GraficoPizza = () => {
    const [labels, setLabels] = useState([]);
    const [valores, setValores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/relatorios/mais-vendidos")
            .then(res => {
                const dados = res.data;
                setLabels(dados.map(p => p.nome));
                setValores(dados.map(p => p.total));
            })
            .catch(err => console.error("Erro ao carregar gráfico:", err));
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "Vendas",
                data: valores,
                backgroundColor: ["#153d64", "#1587b8", "#62c2eb", "#9cd4f0", "#97adb7ff"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Produtos Mais Vendidos" },
        },
    };

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <Pie data={data} options={options} />
        </div>
    );
};
