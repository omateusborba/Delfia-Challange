import TVendedores from "../Tables/Vendores";
import { Toast } from "bootstrap";

export default function Vendedores() {
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
                                                <h5 className="card-title">Vendedores</h5>
                                                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modaladdprodutos" id="liveToastBtn">+ Adicionar</button>
                                            </div>
                                            <hr />
                                            <div className="card-text"><TVendedores /></div>
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
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control mb-3" id="nome" required/>
                                    <label for="email" class="form-label">E-mail</label>
                                    <input type="email" class="form-control mb-3" id="email" required/>
                                    <label for="senha" class="form-label">Senha</label>
                                    <input type="password" class="form-control mb-3" id="senha" required/>
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
                    <div className="toast-body">Vendedor(a) adicionado(a) com sucesso!</div>
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