import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    // Buscar produtos do backend
    axios
      .get("http://localhost:8081/estoque")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const showToast = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = new Toast(el);
    t.show();
  };

  // Adicionar produto
  const AdicionarProduto = async () => {
    if (!nome || !quantidade || !preco) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoProduto = {
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco.replace(",", ".")),
    };

    try {
      const res = await axios.post("http://localhost:8081/estoque", novoProduto);
      setProdutos((prev) => [...prev, res.data]);
      setNome(""); setQuantidade(""); setPreco("");
      showToast("add");
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  // Editar produto
  const EditarProduto = async () => {
    if (!produtoSelecionado) return;

    const dadosAtualizados = {
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco.replace(",", ".")),
    };

    try {
      await axios.put(`http://localhost:8081/estoque/${produtoSelecionado.id_produto}`, dadosAtualizados);
      setProdutos((prev) =>
        prev.map((p) =>
          p.id_produto === produtoSelecionado.id_produto
            ? { ...p, ...dadosAtualizados }
            : p
        )
      );
      showToast("edit");
    } catch (err) {
      console.error("Erro ao editar:", err);
    }
  };

  // Excluir produto
  const ExcluirProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/estoque/${id}`);
      setProdutos((prev) => prev.filter((p) => p.id_produto !== id));
      showToast("liveToast");
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <>
      <div className="table-responsive">
        {produtos.length === 0 ? (
          <h5 style={{ textAlign: "center" }}>
            Ops... Ainda não temos produtos por aqui. Clique em ‘Adicionar’ para começar!
          </h5>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id_produto}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {Number(produto.preco).toFixed(2).replace(".", ",")}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modaledit"
                        onClick={() => {
                          setProdutoSelecionado(produto); setNome(produto.nome);
                          setQuantidade(produto.quantidade);
                          setPreco(produto.preco);
                        }} >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button type="button"
                        className="btn btn-danger flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalremove"
                        onClick={() => setProdutoSelecionado(produto)} >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal remover */}
      <div className="modal fade" id="modalremove" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Remover Produto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Tem certeza que deseja excluir o produto?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => ExcluirProduto(produtoSelecionado.id_produto)}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal editar */}
      <div className="modal fade" id="modaledit" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Produto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <label className="form-label">Nome</label>
                <input className="form-control mb-3" value={nome} onChange={(e) => setNome(e.target.value)} />
                <label className="form-label">Quantidade</label>
                <input type="number" className="form-control mb-3" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                <label className="form-label">Preço</label>
                <input className="form-control mb-3" value={preco} onChange={(e) => setPreco(e.target.value)} />
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-primary" data-bs-dismiss="modal" onClick={EditarProduto}>Salvar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast text-bg-danger">
          <div className="d-flex">
            <div className="toast-body">Produto removido com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="edit" className="toast text-bg-primary mt-2">
          <div className="d-flex">
            <div className="toast-body">Produto editado com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="add" className="toast text-bg-success mt-2">
          <div className="d-flex">
            <div className="toast-body">Produto adicionado com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>
    </>
  );
}
