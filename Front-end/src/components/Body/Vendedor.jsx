import Vendas from "../Tables/Vendas";
import TClientes from "../Tables/Clientes";
import { Toast } from "bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Vendedor() {
    const [pedidos, setPedidos] = useState([]);
    const [totalMensal, setTotalMensal] = useState(0);
    const [qtdMensal, setQtdMensal] = useState(0);
    const [clientes, setClientes] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [novaVenda, setNovaVenda] = useState({
        idCliente: '',
        idVendedor: '',
        itens: []
    });

    // Estados para adicionar cliente
    const [novoCliente, setNovoCliente] = useState({
        nome: '',
        telefone: '',
        instagram: ''
    });

    // ---------------------
    // Carregar pedidos
    useEffect(() => {
        axios.get("http://localhost:8081/vendas")
            .then((res) => {
                const dados = res.data;
                setPedidos(dados);

                const hoje = new Date();
                const mesAtual = hoje.getMonth();
                const anoAtual = hoje.getFullYear();

                const pedidosDoMes = dados.filter(p => {
                    const dataPedido = new Date(p.dt_pedido);
                    return (
                        dataPedido.getMonth() === mesAtual &&
                        dataPedido.getFullYear() === anoAtual
                    );
                });

                const total = pedidosDoMes.reduce((acc, p) => acc + Number(p.vl_total), 0);
                setTotalMensal(total);
                setQtdMensal(pedidosDoMes.length);
            })
            .catch((err) => console.error("Erro ao buscar pedidos:", err));
    }, []);

    // ---------------------
    // Carregar clientes
    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = () => {
        axios.get("http://localhost:8081/clientes")
            .then((res) => {
                console.log("CLIENTES API:", res.data);
                setClientes(res.data);
            })
            .catch((err) => console.error("Erro ao buscar clientes:", err));
    };

    // ---------------------
    // Carregar vendedores
    useEffect(() => {
        axios.get("http://localhost:8081/vendedores")
            .then((res) => setVendedores(res.data))
            .catch((err) => console.error("Erro ao buscar vendedores:", err));
    }, []);

    // ---------------------
    // Carregar produtos (estoque)
    useEffect(() => {
        axios.get("http://localhost:8081/produtos")
            .then((res) => {
                console.log("PRODUTOS API:", res.data);
                setProdutos(res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar produtos:", err);
                axios.get("http://localhost:8081/estoque")
                    .then((res) => {
                        console.log("ESTOQUE API:", res.data);
                        setProdutos(res.data);
                    })
                    .catch((err2) => console.error("Erro ao buscar estoque:", err2));
            });
    }, []);

    // ---------------------
    // Adicionar cliente
    const adicionarCliente = async () => {
        if (!novoCliente.nome) {
            alert('Nome do cliente é obrigatório!');
            return;
        }

        try {
            await axios.post("http://localhost:8081/clientes", novoCliente);
            showToast("taddclientes");
            setNovoCliente({ nome: '', telefone: '', instagram: '' });
            carregarClientes();

            // Fechar o modal
            const modal = document.getElementById('modaladdclientes');
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        } catch (err) {
            console.error("Erro ao adicionar cliente:", err);
            alert('Erro ao adicionar cliente: ' + (err.response?.data || err.message));
        }
    };

    // ---------------------
    // Adicionar item na venda
    const adicionarItem = () => {
        setNovaVenda({
            ...novaVenda,
            itens: [...novaVenda.itens, { idProduto: '', quantidade: 1 }]
        });
    };

    // Remover item da venda
    const removerItem = (index) => {
        const novosItens = [...novaVenda.itens];
        novosItens.splice(index, 1);
        setNovaVenda({ ...novaVenda, itens: novosItens });
    };

    // Atualizar item da venda
    const atualizarItem = (index, campo, valor) => {
        const novosItens = [...novaVenda.itens];
        novosItens[index][campo] = campo === 'quantidade' ? parseInt(valor) : valor;
        setNovaVenda({ ...novaVenda, itens: novosItens });
    };

    // ---------------------
    // Adicionar venda
    const adicionarVenda = async () => {
        if (!novaVenda.idCliente || !novaVenda.idVendedor || novaVenda.itens.length === 0) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const itensVenda = novaVenda.itens.map(item => {
            const produtoSelecionado = produtos.find(p =>
                String(p.id_produto || p.id) === String(item.idProduto)
            );

            if (!produtoSelecionado) {
                throw new Error("Produto não encontrado!");
            }

            return {
                nomeProduto: produtoSelecionado.nm_produto || produtoSelecionado.nome,
                quantidade: parseInt(item.quantidade)
            };
        });

        const vendaRequest = {
            idCliente: parseInt(novaVenda.idCliente),
            idVendedor: parseInt(novaVenda.idVendedor),
            itens: itensVenda
        };

        console.log("Enviando venda com múltiplos itens:", vendaRequest);

        try {
            const response = await axios.post("http://localhost:8081/vendas", vendaRequest);
            console.log("Venda criada:", response.data);
            showToast("taddvenda");
            setNovaVenda({
                idCliente: '',
                idVendedor: '',
                itens: []
            });

            // Atualizar a lista de pedidos
            const res = await axios.get("http://localhost:8081/vendas");
            setPedidos(res.data);

            // Fechar o modal
            const modal = document.getElementById('modaladdvendas');
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();

            // Recarregar a página após sucesso
            window.location.reload();
        } catch (err) {
            console.error("Erro ao adicionar venda:", err);
            alert('Erro ao adicionar venda: ' + (err.response?.data || err.message));
        }
    };

    // ---------------------
    // Toast
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
                            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-2">
                                <div className="col">
                                    <div className="card text-bg-success">
                                        <div className="card-body">
                                            <h5 className="card-title">R${totalMensal.toFixed(2).replace(".", ",")}</h5>
                                            <hr />
                                            <div className="card-text">Valor Total Em Vendas Mensais</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="card text-bg-primary">
                                        <div className="card-body">
                                            <h5 className="card-title">{qtdMensal}</h5>
                                            <hr />
                                            <div className="card-text">Quantidade De Vendas Mensais</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="card text-bg-secondary">
                                        <div className="card-body">
                                            <h5 className="card-title">{clientes.length}</h5>
                                            <hr />
                                            <div className="card-text">Total De Clientes</div>
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
                                                    <button className="btn btn-secondary">Exportar</button>
                                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modaladdvendas">+ Adicionar</button>
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

                    <div className='row m-3 justify-content-center'>
                        <div className="col-12 p-0">
                            <div className="row row-cols-1">
                                <div className="col">
                                    <div className="shadow card text-bg-light">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h5 className="card-title">Clientes</h5>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-secondary">Exportar</button>
                                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modaladdclientes">+ Adicionar</button>
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
                </div>

                {/* Modal adicionar cliente */}
                <div className="modal fade" id="modaladdclientes" tabIndex="-1" aria-labelledby="modaladdclientes" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Cliente</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label className="form-label">Nome do Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={novoCliente.nome}
                                        onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                                        required
                                    />
                                    <label className="form-label">Telefone</label>
                                    <input
                                        type="tel"
                                        className="form-control mb-3"
                                        value={novoCliente.instagram}
                                        onChange={(e) => setNovoCliente({ ...novoCliente, instagram: e.target.value })}
                                    />
                                    <label className="form-label">Instagram</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={novoCliente.telefone}
                                            onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-success" onClick={adicionarCliente}>Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal adicionar venda */}
                <div className="modal fade" id="modaladdvendas" tabIndex="-1" aria-labelledby="modaladdvendas" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Venda</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Cliente</label>
                                            <select
                                                className="form-select mb-3"
                                                value={novaVenda.idCliente}
                                                onChange={(e) => setNovaVenda({ ...novaVenda, idCliente: e.target.value })}
                                                required
                                            >
                                                <option value="">Selecione um cliente</option>
                                                {clientes.map(cliente => (
                                                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                                        {cliente.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Vendedor</label>
                                            <select
                                                className="form-select mb-3"
                                                value={novaVenda.idVendedor}
                                                onChange={(e) => setNovaVenda({ ...novaVenda, idVendedor: e.target.value })}
                                                required
                                            >
                                                <option value="">Selecione um vendedor</option>
                                                {vendedores.map(vendedor => (
                                                    <option key={vendedor.id_vendedor} value={vendedor.id_vendedor}>
                                                        {vendedor.nm_usuario}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <label className="form-label">Itens da Venda</label>
                                    <table className="table table-bordered align-center">
                                        <thead className="table-light">
                                            <tr>
                                                <th width="100px">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
                                                        onClick={adicionarItem}
                                                    >
                                                        Adicionar
                                                    </button>
                                                </th>
                                                <th>Produto</th>
                                                <th>Quantidade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {novaVenda.itens.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => removerItem(index)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            value={item.idProduto}
                                                            onChange={(e) => atualizarItem(index, 'idProduto', e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Selecione um produto</option>
                                                            {produtos.map(produto => (
                                                                <option
                                                                    key={produto.id_produto || produto.id}
                                                                    value={produto.id_produto || produto.id}
                                                                >
                                                                    {produto.nm_produto || produto.nome} - R$ {(produto.vl_preco || produto.preco).toFixed(2)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td width="120px">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            min="1"
                                                            value={item.quantidade}
                                                            onChange={(e) => atualizarItem(index, 'quantidade', e.target.value)}
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            {novaVenda.itens.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted">
                                                        Nenhum item adicionado. Clique em "Adicionar" para incluir produtos.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-success" onClick={adicionarVenda}>Adicionar Venda</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toasts */}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="taddclientes" className="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">Cliente adicionado com sucesso!</div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
                <div id="taddvenda" className="toast text-bg-success mt-2" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">Venda adicionada com sucesso!</div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    );
}