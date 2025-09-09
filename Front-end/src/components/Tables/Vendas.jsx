// src/pages/Vendas.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);

  const showToast = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = new Toast(el);
    t.show();
  };

  // 🔹 Buscar vendas ao carregar
  useEffect(() => {
    axios
      .get("http://localhost:8081/vendas")
      .then((res) => setVendas(res.data))
      .catch((err) => console.error("Erro ao buscar vendas:", err));
  }, []);

  // 🔹 Remover venda
  const removerVenda = () => {
    if (!vendaSelecionada) return;

    // Usa id_pedido ou idPedido dependendo do que vem do backend
    const id = vendaSelecionada.id_pedido || vendaSelecionada.idPedido;

    axios
      .delete(`http://localhost:8081/vendas/${id}`)
      .then(() => {
        setVendas(vendas.filter((v) => (v.id_pedido || v.idPedido) !== id));
        showToast("tremovevenda");
      })
      .catch((err) => console.error("Erro ao remover:", err));
  };


  // 🔹 Selecionar venda para remoção
  const selecionarParaRemocao = (venda) => {
    setVendaSelecionada(venda);
  };



  const formatarDataBrasileira = (dataString) => {
    const date = new Date(dataString + 'T00:00:00-03:00');
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="table-esponsive">
      {/* Tabela de vendas */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Itens</th>
            <th>Valor Total</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id_pedido || venda.idPedido}>
              <td>{venda.vendedor}</td>
              <td>{venda.cliente || "Cliente sem cadastro"}</td>
              <td>
                {venda.itens && venda.itens.length > 0
                  ? venda.itens.map((i, idx) => <div key={idx}>{i}</div>)
                  : "(sem itens)"}
              </td>
              <td>R$ {Number(venda.vl_total).toFixed(2).replace(".", ",")}</td>
              <td>{formatarDataBrasileira(venda.dt_pedido)}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-danger flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalremove"
                    onClick={() => selecionarParaRemocao(venda)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Remover */}
      <div className="modal fade" id="modalremove" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Remover Venda</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja remover esta venda?
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={removerVenda}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* Toasts */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="tremovevenda" className="toast text-bg-danger">
          <div className="toast-body">Venda removida com sucesso</div>
        </div>
      </div>
    </div>
  );
}