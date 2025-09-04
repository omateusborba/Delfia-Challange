import axios from "axios";
import { useEffect, useState } from "react";

function ExcluirProduto(id) {
    axios.delete(`http://localhost:8081/${id}`).then(() => window.location.reload()).catch(err => console.error('Erro ao deletar: ', err))
}

function ListaProduto() {
    const [produtos, setProdutos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/estoque').then(response => {
            setProdutos(response.data)
        }).catch(error => {
            console.error('Erro ao buscar produtos: ', error)
        })
    }, [])


    if (produtos.length == 0) {
        return (
            <>
                <h5 style={{ textAlign: "center" }}>Ops... Ainda não temos produtos por aqui. Clique em ‘Adicionar’ para começar!</h5>
            </>
        )
    } else {
        return (
            <>
                {/* <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Opções</th>
                    </tr>
                </thead>

                {produtos.map(produto => (
                    <tbody>
                        <tr>
                            <th key={produto.id}>{produto.nome}</th>
                            <td>{produto.quantidade}</td>
                            <td>R${produto.preco.toFixed(2).replace('.', ',')}</td>
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

                    </tbody> */}
                ))}
            </>
        )
    }
}

export default ListaProduto