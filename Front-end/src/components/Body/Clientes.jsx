import { useState } from "react";
import Clientes from "../Tables/Clientes";
import { Toast } from "bootstrap";
import axios from "axios";

export default function Estoque() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [instagram, setInstagram] = useState("");

    const showToast = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const t = new Toast(el);
        t.show();
    };

    const AdicionarCliente = async () => {
        if (!nome || !telefone || !instagram) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoCliente = {
            nome,
            telefone: String(telefone),
            instagram: String(instagram),
        };

        try {
            await axios.post("http://localhost:8081/clientes", novoCliente);

            // mostra o toast
            showToast("add");

            // limpa inputs
            setNome("");
            setTelefone("");
            setInstagram("");

            // reload da página
            setTimeout(() => {
                window.location.reload();
            }, 500); // espera meio segundo para o toast aparecer
        } catch (err) {
            console.error("Erro ao adicionar cliente: ", err);
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
                                            <h5 className="card-title">Clientes</h5>
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
                                            <Clientes clientes={clientes} setClientes={setClientes} />
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
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                    <label htmlFor="telefone" className="form-label">Telefone</label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        id="telefone"
                                        required
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                    />
                                    <label htmlFor="instagram" className="form-label">Instagram</label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        id="instagram"
                                        required
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
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
                                    onClick={AdicionarCliente}
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
                        <div className="toast-body">Cliente adicionado com sucesso!</div>
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
