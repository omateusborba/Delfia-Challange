import TClientes from "../Tables/Clientes";
import { Toast } from "bootstrap";

export default function Clintes() {
    const showToast = (id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const t = new Toast(el);
            t.show();
        };
        return (
            <>
                <div className="main">
                    <div className='row m-3 justify-content-center'>
                        <div className="col-12 p-0">
                            <div className="row row-cols-1">
                                <div className="col">
                                        <div className="shadow card text-bg-light">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h5 className="card-title">Clientes</h5>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modaladdprodutos" id="exportar">Exportar</button>
                                                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modaladdprodutos" id="liveToastBtn">+ Adicionar</button>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="card-text"><TClientes /></div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="modaladdprodutos" tabindex="-1" aria-labelledby="modaladdprodutos" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered ">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <label for="nome" class="form-label">Nome do Cliente</label>
                                        <input type="text" class="form-control mb-3" id="nome" required/>
                                        <label for="insta" class="form-label">Instagram</label>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text">@</span>
                                            <input type="text" class="form-control" id="insta"/>
                                        </div>
                                        <label for="tel" class="form-label">Telefone</label>
                                        <input type="phone" class="form-control mb-3" id="tel" />
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() => showToast("add")}>Adicionar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        )
    }