import { useState } from "react";
import Produtos from "../Tables/Estoque";
import { Toast } from "bootstrap";
import axios from "axios";

export default function Estoque() {
    const [produtos, setProdutos] = useState([]); // mantém a lista local
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");

    const showToast = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const t = new Toast(el);
        t.show();
    };

    const AdicionarProduto = async () => {
    // valida campos
    if (!nome || !quantidade || !preco) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoProduto = {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
    };

    try {
        await axios.post("http://localhost:8081/estoque", novoProduto);

        // opcional: mostra o toast
        showToast("add");

        // limpa inputs
        setNome("");
        setQuantidade("");
        setPreco("");

        // **reload da página**
        window.location.reload();

    } catch (err) {
        console.error("Erro ao adicionar produto: ", err);
    }
};

    return (
        <>
            <div className="main">
                <div className="row m-3 justify-content-center">
                    <div className="col-12 p-0">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="shadow card text-bg-light">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title">Estoque</h5>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-secondary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target=""
                                                >
                                                    Exportar
                                                </button>
                                                <button
                                                    className="btn btn-success"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modaladdprodutos"
                                                >
                                                    + Adicionar
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="card-text">
                                            <Produtos produtos={produtos} setProdutos={setProdutos} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal adicionar */}
                <div
                    className="modal fade"
                    id="modaladdprodutos"
                    tabIndex="-1"
                    aria-labelledby="modaladdprodutos"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label htmlFor="nome" className="form-label">
                                        Produto
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        id="nome"
                                        required
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                    <label htmlFor="qtd" className="form-label">
                                        Quantidade
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        id="qtd"
                                        required
                                        value={quantidade}
                                        onChange={(e) => setQuantidade(e.target.value)}
                                    />
                                    <label htmlFor="preco" className="form-label">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        id="preco"
                                        required
                                        step="0.01"
                                        value={preco}
                                        onChange={(e) => setPreco(e.target.value)}
                                    />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                    onClick={AdicionarProduto}
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST */}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div
                    id="add"
                    className="toast text-bg-success"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">Produto adicionado com sucesso!</div>
                        <button
                            type="button"
                            className="btn-close me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                </div>
            </div>
        </>
    );
}
