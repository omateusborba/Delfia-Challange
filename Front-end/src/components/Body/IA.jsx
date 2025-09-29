import { useState } from "react";
import axios from "axios";

export default function IA() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Olá 👋! Escolha uma pergunta abaixo para eu responder:" }
    ]);
    const [loading, setLoading] = useState(false);

    const perguntas = [
        { label: "Quais os clientes que mais compram?", value: "clientes" },
        { label: "Quais os produtos que mais vendem?", value: "produtos" },
        { label: "Quais produtos estão perto de acabar no meu estoque?", value: "estoque" },
        { label: "Analisando os meus dados, qual a melhor estratégia de negócio para esse mês?", value: "estrategia" }
    ];

    const handlePergunta = async ({ label, value }) => {
        setMessages((prev) => [...prev, { sender: "user", text: label }]);
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8081/ia", {
                pergunta: value
            });
            if (res.status === 200 && res.data?.resposta) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: res.data.resposta }
                ]);
            } else {
                throw new Error("Resposta inesperada do servidor");
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Erro ao buscar resposta da IA." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main">
            <div className="row m-3 justify-content-center">
                <div className="col-12 p-0">
                    <div className="shadow card text-bg-light">
                        <div className="card-body">
                            <h5 className="card-title">Insight IA</h5>
                            <hr />

                            {/* Área de chat */}
                            <div
                                className="chat-box mb-3 p-3"
                                style={{
                                    height: "300px",
                                    overflowY: "auto",
                                    background: "#f8f9fa",
                                    borderRadius: "8px"
                                }}
                            >
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-2 d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                                            }`}
                                    >
                                        <span
                                            className={`p-2 rounded ${msg.sender === "user"
                                                ? "bg-primary text-white"
                                                : "bg-light border"
                                                }`}
                                        >
                                            {msg.text}
                                        </span>
                                    </div>
                                ))}
                                {loading && <div class="spinner-grow text-primary spinner-grow-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>}
                            </div>

                            {/* Botões de perguntas pré-definidas */}
                            <div className="d-flex flex-wrap gap-2">
                                {perguntas.map((pergunta, idx) => (
                                    <button
                                        key={idx}
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handlePergunta(pergunta)}
                                    >
                                        {pergunta.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
