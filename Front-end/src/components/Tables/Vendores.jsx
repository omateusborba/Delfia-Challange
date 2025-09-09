import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default function Vendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [vendedorSelecionado, setVendedorSelecionado] = useState(null);
  const [nm_usuario, setNm_usuario] = useState("");
  const [tx_email, setTx_email] = useState("");
  const [tx_senha, setTx_senha] = useState("");

  useEffect(() => {
    // Buscar vendedores do backend
    axios
      .get("http://localhost:8081/vendedores")
      .then((res) => setVendedores(res.data))
      .catch((err) => console.error("Erro ao buscar vendedores:", err));
  }, []);

  const showToast = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = new Toast(el);
    t.show();
  };

  // Editar vendedor
  const EditarVendedores = async () => {
    if (!vendedorSelecionado) return;

    const dadosAtualizados = {
      nm_usuario,
      tx_email,
      tx_senha
    };

    try {
      await axios.put(
        `http://localhost:8081/vendedores/${vendedorSelecionado.id_vendedor}`,
        dadosAtualizados
      );
      setVendedores((prev) =>
        prev.map((p) =>
          p.id_vendedor === vendedorSelecionado.id_vendedor
            ? { ...p, ...dadosAtualizados }
            : p
        )
      );
      showToast("edit");
    } catch (err) {
      console.error("Erro ao editar:", err);
    }
  };

  // Excluir vendedor
  const ExcluirVendedor = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:8081/vendedores/${id}`);
      setVendedores((prev) => prev.filter((p) => p.id_vendedor !== id));
      showToast("liveToast");
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <>
      <div className="table-responsive">
        {vendedores.length === 0 ? (
          <h5 style={{ textAlign: "center" }}>
            Ops... Ainda não temos vendedores por aqui.
          </h5>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {vendedores.map((vendedor) => (
                <tr key={vendedor.id_vendedor}>
                  <td>{vendedor.nm_usuario}</td>
                  <td>{vendedor.tx_email}</td> 
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modaledit"
                        onClick={() => {
                          setVendedorSelecionado(vendedor);
                          setNm_usuario(vendedor.nm_usuario);
                          setTx_email(vendedor.tx_email);
                          setTx_senha(vendedor.tx_senha);
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalremove"
                        onClick={() => setVendedorSelecionado(vendedor)}
                      >
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
              <h5 className="modal-title">Remover vendedor</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Tem certeza que deseja excluir o vendedor?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() =>
                  vendedorSelecionado && ExcluirVendedor(vendedorSelecionado.id_vendedor)
                }
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
              <h5 className="modal-title">Editar Vendedor</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <label className="form-label">Nome</label>
                <input
                  className="form-control mb-3"
                  value={nm_usuario}
                  onChange={(e) => setNm_usuario(e.target.value)}
                />
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={tx_email}
                  onChange={(e) => setTx_email(e.target.value)}
                />
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control mb-3"
                  value={tx_senha}
                  onChange={(e) => setTx_senha(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={EditarVendedores}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast text-bg-danger">
          <div className="d-flex">
            <div className="toast-body">Vendedor removido com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="edit" className="toast text-bg-primary mt-2">
          <div className="d-flex">
            <div className="toast-body">Vendedor editado avec sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="add" className="toast text-bg-success mt-2">
          <div className="d-flex">
            <div className="toast-body">Vendedor adicionado com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>
    </>
  );
}