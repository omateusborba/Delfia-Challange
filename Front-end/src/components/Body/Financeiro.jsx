import { BarChart } from '../BarChart';
import { GraficoPizza } from "../GraficoPizza";

export default function Financeiro() {
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
                                    <p className="card-text">$ Vendas Mensais</p>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card text-bg-primary">
                                <div className="card-body">
                                    <h5 className="card-title">200</h5>
                                    <hr />
                                    <p className="card-text">Qtd. Vendas Mensais</p>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card text-bg-secondary">
                                <div className="card-body">
                                    <h5 className="card-title">30</h5>
                                    <hr />
                                    <p className="card-text">Novos Clientes</p>
                                </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card text-bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title">3</h5>
                                    <hr />
                                    <p className="card-text">Vendedores</p>
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
                                    <p className="card-text"><BarChart /></p>
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
                                            <p className="card-text"><GraficoPizza /></p>
                                        </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="shadow card text-bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">Vendas / Clientes</h5>
                                            <hr />
                                            <p className="card-text"><GraficoPizza /></p>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="container-financeiro">
                    <div className="cont3">
                    </div>
                    <div className="cont3">
                        
                    </div>
                </div>
                <div className="cont4">
                    <p>Vendas mensais</p>
                    <table className="table table-striped mx-auto my-4" style={{ width: '99%' }}>
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Compras</th>
                                <th scope="col">Produtos</th>
                                <th scope="col">Preferido</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Lorem, ipsum.</th>
                                <td>(99)999999999</td>
                                <td>9</td>
                                <td>9</td>
                                <td>Lorem.</td>
                            </tr>
                            <tr>
                                <th scope="row">Lorem, ipsum.</th>
                                <td>(99)999999999</td>
                                <td>9</td>
                                <td>9</td>
                                <td>Lorem.</td>
                            </tr>
                            <tr>
                                <th scope="row">Lorem, ipsum.</th>
                                <td>(99)999999999</td>
                                <td>9</td>
                                <td>9</td>
                                <td>Lorem.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}