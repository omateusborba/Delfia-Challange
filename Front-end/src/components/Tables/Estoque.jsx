import { useEffect, useRef, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import RowReorder from "datatables.net-rowreorder";
import { Toast } from "bootstrap";
import axios from "axios";

DataTable.use(DT);
DataTable.use(RowReorder);

function ExcluirProduto(id) {
  axios.delete(`http://localhost:8081/${id}`).then(() => window.location.reload()).catch(err => console.error('Erro ao deletar: ', err))
}
export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8081/estoque")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos: ", error);
      });
  }, []);

  const showToast = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = new Toast(el);
    t.show();
  };

  return (
    <>
      <div className="table-responsive">
        {produtos.length === 0 ? (
          <h5 style={{ textAlign: "center" }}>
            Ops... Ainda não temos produtos por aqui. Clique em ‘Adicionar’ para
            começar!
          </h5>
        ) : (
          <DataTable
            ref={tableRef}
            id="Estoque"
            className="table table-striped table-bordered"
            options={{
              rowReorder: true,
              responsive: true,
              language: {
                lengthMenu: "Mostrar _MENU_ registros por página",
                zeroRecords: "Nenhum registro encontrado",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                infoEmpty: "Mostrando 0 a 0 de 0 registros",
                infoFiltered: "(filtrado de _MAX_ registros no total)",
                search: "Pesquisar:",
              },
            }}
          >
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
                  <td>
                    R${" "}
                    {produto.preco
                      .toFixed(2)
                      .replace(".", ",")}
                  </td>
                  <td className="p-2">
                    <div className="d-flex justify-content-center align-items-center gap-2 w-100">
                      <button
                        type="button"
                        className="btn btn-primary flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modaledit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger flex-fill py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalremove"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
      </div>

      {/* Modal remover */}
      <div
        className="modal fade"
        id="modalremove"
        tabIndex={-1}
        aria-labelledby="modalremoveLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja excluir o produto?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              {produtos.map((produto) => (
                <button
                  key={produto.id}
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={async () => {
                    showToast("liveToast");
                      await ExcluirProduto(produto.id); // aguarda a exclusão
                      // se quiser atualizar a lista sem recarregar:
                      // setProdutos(produtos.filter(p => p.id !== produto.id));
                  }}
                >
                  Remover
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal editar */}
      <div
        className="modal fade"
        id="modaledit"
        tabIndex={-1}
        aria-labelledby="modaleditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <label htmlFor="nome" className="form-label">
                  Nome Produto
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="nome"
                  placeholder="Nome do produto"
                />
                <label htmlFor="qtd" className="form-label">
                  Quantidade
                </label>
                <input
                  type="number"
                  className="form-control mb-3"
                  id="qtd"
                  placeholder="0"
                />
                <label htmlFor="preco" className="form-label">
                  Preço
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="preco"
                  placeholder="R$ 0,00"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => showToast("edit")}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOASTS */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast text-bg-danger"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Produto removido com sucesso!</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>

        <div
          id="edit"
          className="toast text-bg-primary mt-2"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Produto editado com sucesso!</div>
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
  );
}