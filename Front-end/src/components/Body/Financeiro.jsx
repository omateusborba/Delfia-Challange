import { BarChart } from '../BarChart';
import { GraficoPizza } from "../GraficoPizza";
import Vendas from "../Tables/Vendas";
import { Toast } from "bootstrap";

export default function Financeiro() {
    const showToast = (id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const t = new Toast(el);
                t.show();
            };
    return (
        <>
            <div className="main">
                <div className='container-fluid'>
                    <div className="row justify-content-center m-3">
                        <div className="col-12 p-0">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
                            <div className="col">
                                <div className="card text-bg-success">
                                <div className="card-body">
                                    <h5 className="card-title">R$ 500,00</h5>
                                    <hr />
                                    <div className="card-text">$ Vendas Mensais</div>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card text-bg-primary">
                                <div className="card-body">
                                    <h5 className="card-title">200</h5>
                                    <hr />
                                    <div className="card-text">Qtd. Vendas Mensais</div>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card text-bg-secondary">
                                <div className="card-body">
                                    <h5 className="card-title">30</h5>
                                    <hr />
                                    <div className="card-text">Novos Clientes</div>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card text-bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title">3</h5>
                                    <hr />
                                    <div className="card-text">Vendedores</div>
                                </div>
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                    <div className='row m-3 justify-content-center'>
                        <div className="shadow card col-12 text-bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Vendas / Clientes</h5>
                                    <hr />
                                    <div className="card-text"><BarChart /></div>
                                </div>
                        </div>
                    </div>
                    <div className='row m-3 justify-content-center'>
                        <div className="col-12 p-0">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3">
                            <div className="col">
                                <div className="shadow card text-bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">Produtos mais vendidos</h5>
                                            <hr />
                                            <div className="card-text"><GraficoPizza /></div>
                                        </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="shadow card text-bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">Melhores Clientes</h5>
                                            <hr />
                                            <div className="card-text"><GraficoPizza /></div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='row m-3 justify-content-center'>
                        <div className="col-12 p-0">
                        <div className="row row-cols-1">
                        <div className="col">
                                <div className="shadow card text-bg-light">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h5 className="card-title">Vendas</h5>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-secondary" data-bs-toggle="modal">Exportar</button>
                                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modaladdvendas" id="btnaddvendas">+ Adicionar</button>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="card-text"><Vendas /></div>
                                        </div>
                                </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modaladdvendas" tabindex="-1" aria-labelledby="modaladdvendas" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <label for="cliente" className="form-label">Nome do Cliente</label>
                                        <input type="text" className="form-control mb-3" id="cliente" placeholder="Digite o nome do cliente" />
                                        <label for="data" className="form-label">Data</label>
                                        <input type="date" className="form-control mb-3" id="data" />
                                        <table className="table table-bordered align-center">
                                            <thead className="table-light">
                                            <tr>
                                                <th><button type="button" className="btn btn-primary">Adicionar</button></th>
                                                <th>Produto</th>
                                                <th>Quantidade</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><button type="button" className="btn btn-danger">Excluir</button></td>
                                                <td>
                                                <select class="form-select" aria-label="Nome do produto">
                                                    <option selected>Nome do produto</option>
                                                </select>
                                                </td>
                                                <td>
                                                <input type="number" className="form-control mb-3" min="1" value="1" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => showToast("taddvenda")}>Adicionar</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div
                    id="taddvenda"
                    className="toast text-bg-success"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    >
                    <div className="d-flex">
                        <div className="toast-body">Venda adicionada com sucesso!</div>
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