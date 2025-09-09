import { BarChart } from '../BarChart';
import { GraficoPizza } from "../GraficoPizza";
import { GraficoPizzaCliente } from "../GraficoPizzaCliente";
import Vendas from "../Tables/Vendas";
import { Toast } from "bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Financeiro() {
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
        axios.get("http://localhost:8081/clientes")
            .then((res) => {
                console.log("CLIENTES API:", res.data);
                setClientes(res.data);
            })
            .catch((err) => console.error("Erro ao buscar clientes:", err));
    }, []);

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
        axios.get("http://localhost:8081/produtos")  // Corrigido para /produtos
            .then((res) => {
                console.log("PRODUTOS API:", res.data);
                setProdutos(res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar produtos:", err);
                // Fallback para /estoque caso /produtos não exista
                axios.get("http://localhost:8081/estoque")
                    .then((res) => {
                        console.log("ESTOQUE API:", res.data);
                        setProdutos(res.data);
                    })
                    .catch((err2) => console.error("Erro ao buscar estoque:", err2));
            });
    }, []);

    // ---------------------
    // Adicionar item
    const adicionarItem = () => {
        setNovaVenda({
            ...novaVenda,
            itens: [...novaVenda.itens, { idProduto: '', quantidade: 1 }]
        });
    };

    // Remover item
    const removerItem = (index) => {
        const novosItens = [...novaVenda.itens];
        novosItens.splice(index, 1);
        setNovaVenda({ ...novaVenda, itens: novosItens });
    };

    // Atualizar item
    const atualizarItem = (index, campo, valor) => {
        const novosItens = [...novaVenda.itens];
        novosItens[index][campo] = campo === 'quantidade' ? parseInt(valor) : valor;
        setNovaVenda({ ...novaVenda, itens: novosItens });
    };

    // ---------------------
    // Adicionar venda (CORRIGIDO - envia apenas o primeiro item)
    const adicionarVenda = () => {
        if (!novaVenda.idCliente || !novaVenda.idVendedor || novaVenda.itens.length === 0) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const primeiroItem = novaVenda.itens[0];
        if (!primeiroItem.idProduto) {
            alert('Selecione um produto!');
            return;
        }

        // Encontra o produto selecionado
        const produtoSelecionado = produtos.find(p => 
            String(p.id_produto || p.id) === String(primeiroItem.idProduto)
        );

        if (!produtoSelecionado) {
            alert('Produto não encontrado!');
            return;
        }

        // Prepara os dados no formato que o backend espera
        const vendaRequest = {
            nomeProduto: produtoSelecionado.nm_produto || produtoSelecionado.nome,
            quantidadeVendida: primeiroItem.quantidade,
            idCliente: parseInt(novaVenda.idCliente),
            idVendedor: parseInt(novaVenda.idVendedor)
        };

        console.log("Enviando venda:", vendaRequest);

        axios.post("http://localhost:8081/vendas", vendaRequest)
            .then((response) => {
                console.log("Venda criada:", response.data);
                showToast("taddvenda");
                
                // Limpar formulário
                setNovaVenda({
                    idCliente: '',
                    idVendedor: '',
                    itens: []
                });
                
                // Recarregar vendas
                return axios.get("http://localhost:8081/vendas");
            })
            .then((res) => {
                setPedidos(res.data);
                // Fechar modal
                const modal = document.getElementById('modaladdvendas');
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            })
            .catch((err) => {
                console.error("Erro completo ao adicionar venda:", err);
                console.error("Resposta do erro:", err.response?.data);
                alert('Erro ao adicionar venda: ' + (err.response?.data || err.message));
            });
    };

    // ---------------------
    // Toast
    const showToast = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const t = new Toast(el);
        t.show();
    };

    // ---------------------
    // Render
    return (
        <>
            <div className="main">
                <div className='container-fluid'>
                    {/* cards */}
                    <div className="row justify-content-center m-3">
                        <div className="col-12 p-0">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
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
                                <div className="col">
                                    <div className="card text-bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">{vendedores.length}</h5>
                                            <hr />
                                            <div className="card-text">Total De Vendedores</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* gráficos */}
                    <div className='row m-3 justify-content-center'>
                        <div className="shadow card col-12 text-bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Faturamento / Vendas</h5>
                                <hr />
                                <div className="card-text"><BarChart /></div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-3 justify-content-center'>
                        <div className="col-12 p-0">
                            <div className="row row-cols-1 row-cols-md-2 g-3">
                                <div className="col">
                                    <div className="shadow card text-bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">Produtos Mais vendidos</h5>
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
                                            <div className="card-text"><GraficoPizzaCliente /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* tabela de vendas */}
                    <div className='row m-3 justify-content-center'>
                        <div className="col-12 p-0">
                            <div className="shadow card text-bg-light">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title">Vendas</h5>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-secondary" data-bs-toggle="modal">Exportar</button>
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

                {/* modal adicionar venda */}
                <div className="modal fade" id="modaladdvendas" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Nova Venda</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => e.preventDefault()}>
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
                                                    <option
                                                        key={cliente.id_cliente || cliente.id}
                                                        value={cliente.id_cliente || cliente.id}
                                                    >
                                                        {cliente.nm_cliente || cliente.nome}
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
                                                    <option 
                                                        key={vendedor.id_vendedor || vendedor.id} 
                                                        value={vendedor.id_vendedor || vendedor.id}
                                                    >
                                                        {vendedor.nm_usuario || vendedor.nome}
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
                                <button type="button" className="btn btn-success" onClick={adicionarVenda}>
                                    Adicionar Venda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* toast */}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="taddvenda" className="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">Venda adicionada com sucesso!</div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    );
}