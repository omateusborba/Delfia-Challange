import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default function Estoque() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    // Buscar clientes do backend
    axios
      .get("http://localhost:8081/clientes")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  const showToast = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = new Toast(el);
    t.show();
  };

  // Adicionar cliente
  const AdicionarCliente = async () => {
    if (!nome || !instagram || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoCliente = {
      nome,
      telefone: String(telefone),
      instagram: String(instagram),
    };

    try {
      const res = await axios.post("http://localhost:8081/clientes", novoCliente);
      setClientes((prev) => [...prev, res.data]);
      setNome("");
      setTelefone("");
      setInstagram("");
      showToast("add");
    } catch (err) {
      console.error("Erro ao adicionar cliente:", err);
    }
  };

  // Editar cliente
  const EditarClientes = async () => {
    if (!clienteSelecionado) return;

    const dadosAtualizados = {
      nome,
      telefone: String(telefone),
      instagram: String(instagram),
    };

    try {
      await axios.put(
        `http://localhost:8081/clientes/${clienteSelecionado.id_cliente}`,
        dadosAtualizados
      );
      setClientes((prev) =>
        prev.map((p) =>
          p.id_cliente === clienteSelecionado.id_cliente
            ? { ...p, ...dadosAtualizados }
            : p
        )
      );
      showToast("edit");
    } catch (err) {
      console.error("Erro ao editar:", err);
    }
  };

  // Excluir cliente
  const ExcluirCliente = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:8081/clientes/${id}`);
      setClientes((prev) => prev.filter((p) => p.id_cliente !== id));
      showToast("liveToast");
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <>
      <div className="table-responsive">
        {clientes.length === 0 ? (
          <h5 style={{ textAlign: "center" }}>
            Ops... Ainda não temos clientes por aqui. Clique em ‘Adicionar’ para começar!
          </h5>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Instagram</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.instagram}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modaledit"
                        onClick={() => {
                          setClienteSelecionado(cliente);
                          setNome(cliente.nome);
                          setTelefone(cliente.telefone);
                          setInstagram(cliente.instagram);
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalremove"
                        onClick={() => setClienteSelecionado(cliente)}
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
              <h5 className="modal-title">Remover cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Tem certeza que deseja excluir o cliente?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() =>
                  clienteSelecionado && ExcluirCliente(clienteSelecionado.id_cliente)
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
              <h5 className="modal-title">Editar Cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <label className="form-label">Nome</label>
                <input
                  className="form-control mb-3"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <label className="form-label">Telefone</label>
                <input
                  className="form-control mb-3"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
                <label className="form-label">Instagram</label>
                <input
                  className="form-control mb-3"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
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
                onClick={EditarClientes}
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
            <div className="toast-body">Cliente removido com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="edit" className="toast text-bg-primary mt-2">
          <div className="d-flex">
            <div className="toast-body">Cliente editado com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="add" className="toast text-bg-success mt-2">
          <div className="d-flex">
            <div className="toast-body">Cliente adicionado com sucesso!</div>
            <button type="button" className="btn-close m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>
    </>
  );
}
