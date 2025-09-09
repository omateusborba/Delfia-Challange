import { useState } from "react";
import Vendedores from "../Tables/Vendores";
import { Toast } from "bootstrap";
import axios from "axios";

export default function VendedoresPage() {
    const [vendedores, setVendedores] = useState([]);
    const [nm_usuario, setNm_usuario] = useState("");
    const [tx_email, setTx_email] = useState("");
    const [tx_senha, setTx_senha] = useState("");

    const showToast = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const t = new Toast(el);
        t.show();
    };

    const AdicionarVendedor = async () => {
        if (!nm_usuario || !tx_email || !tx_senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoVendedor = {
            nm_usuario,
            tx_email,
            tx_senha
        };

        try {
            await axios.post("http://localhost:8081/vendedores", novoVendedor);

            // mostra o toast
            showToast("add");

            // limpa inputs
            setNm_usuario("");
            setTx_email("");
            setTx_senha("");

            // reload da página
            setTimeout(() => {
                window.location.reload();
            }, 500); // espera meio segundo para o toast aparecer
        } catch (err) {
            console.error("Erro ao adicionar vendedor: ", err);
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
                                            <h5 className="card-title">Vendedores</h5>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-secondary">Exportar</button>
                                                <button
                                                    className="btn btn-success"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modaladdclientes"
                                                >
                                                    + Adicionar
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="card-text">
                                            <Vendedores vendedores={vendedores} setVendedores={setVendedores} />
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
                    id="modaladdclientes"
                    tabIndex="-1"
                    aria-labelledby="modaladdclientes"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Vendedor</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        id="nome"
                                        required
                                        value={nm_usuario}
                                        onChange={(e) => setNm_usuario(e.target.value)}
                                    />
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input
                                        type="email"
                                        className="form-control mb-3"
                                        id="email"
                                        required
                                        value={tx_email}
                                        onChange={(e) => setTx_email(e.target.value)}
                                    />
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        id="senha"
                                        required
                                        value={tx_senha}
                                        onChange={(e) => setTx_senha(e.target.value)}
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
                                    onClick={AdicionarVendedor}
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
                        <div className="toast-body">Vendedor adicionado com sucesso!</div>
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