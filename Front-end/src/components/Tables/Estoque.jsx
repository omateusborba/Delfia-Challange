import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import RowReorder from "datatables.net-rowreorder";
import { Toast } from "bootstrap";

DataTable.use(DT);
DataTable.use(RowReorder);

export default function Estoque() {
  const showToast = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = new Toast(el);
    t.show();
  };

  return (
    <>

      <div className="table-responsive">
        <DataTable
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
            <tr>
              <th>Pacote Coxinha</th>
              <td>15</td>
              <td>R$ 20,00</td>
              <td className="p-2">
                <div className="d-flex justify-content-center align-items-center gap-2 w-100">
                  <button
                    type="button"
                    className="btn btn-primary flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modaledit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalremove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            {/* repita linhas conforme precisar */}
            <tr>
              <th>Bandeja Empada</th>
              <td>50</td>
              <td>R$ 12,00</td>
              <td className="p-2">
                <div className="d-flex justify-content-center align-items-center gap-2 w-100">
                  <button
                    type="button"
                    className="btn btn-primary flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modaledit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalremove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th>Lasanha</th>
              <td>25</td>
              <td>R$ 25,00</td>
              <td className="p-2">
                <div className="d-flex justify-content-center align-items-center gap-2 w-100">
                  <button
                    type="button"
                    className="btn btn-primary flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modaledit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger flex-fill py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalremove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </DataTable>
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
            <div className="modal-body">Tem certeza que deseja excluir o produto?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>

              {/* aqui chama o toast "liveToast" */}
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => showToast("liveToast")}
              >
                Remover
              </button>
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
                  placeholder="Pacote de coxinha"
                  defaultValue={"Pacote de coxinha"}
                />
                <label htmlFor="qtd" className="form-label">
                  Quantidade
                </label>
                <input
                  type="number"
                  className="form-control mb-3"
                  id="qtd"
                  placeholder="15"
                />
                <label htmlFor="preco" className="form-label">
                  Preço
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="preco"
                  placeholder="R$ 20,00"
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

              {/* aqui chama o toast "edit" */}
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

      {/* TOASTS (containers) */}
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
