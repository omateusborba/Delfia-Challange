// src/components/BarChart.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const BarChart = () => {
    const [faturamento, setFaturamento] = useState(Array(12).fill(0));
    const [quantidade, setQuantidade] = useState(Array(12).fill(0));

    useEffect(() => {
        axios.get("http://localhost:8081/vendas")
            .then((res) => {
                const dados = res.data;

                // Inicializa arrays com 0
                const faturamentoPorMes = Array(12).fill(0);
                const quantidadePorMes = Array(12).fill(0);

                dados.forEach((pedido) => {
                    const dataPedido = new Date(pedido.dt_pedido);
                    const mes = dataPedido.getMonth(); // 0 = Janeiro

                    faturamentoPorMes[mes] += Number(pedido.vl_total);
                    quantidadePorMes[mes] += 1;
                });

                setFaturamento(faturamentoPorMes);
                setQuantidade(quantidadePorMes);
            })
            .catch((err) => console.error("Erro ao buscar pedidos:", err));
    }, []);

    const data = {
        labels: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ],
        datasets: [
            {
                label: "Faturamento (R$)",
                data: faturamento,
                backgroundColor: "#153d64",
            },
            {
                label: "Qtd. Vendas",
                data: quantidade,
                backgroundColor: "#1587b8",
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <Bar data={data} options={options} />;
};
