package org.example.dao;

import org.example.factory.Factory;

import java.sql.*;

public class VendaDAO {
    private Connection conexao;

    public VendaDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    // Classe auxiliar para retornar o resultado da venda
    public static class ResultadoVenda {
        public boolean sucesso;
        public String mensagem;
        public int idProduto;
        public double subtotal;

        public ResultadoVenda(boolean sucesso, String mensagem, int idProduto, double subtotal) {
            this.sucesso = sucesso;
            this.mensagem = mensagem;
            this.idProduto = idProduto;
            this.subtotal = subtotal;
        }
    }

    public ResultadoVenda realizarVenda(String nomeProduto, int quantidadeVendida) {
        String sqlBusca = "SELECT id_produto, qt_produto, vl_preco FROM t_estoque WHERE nm_produto = ?";
        String sqlAtualiza = "UPDATE t_estoque SET qt_produto = ? WHERE id_produto = ?";

        try (PreparedStatement stmtBusca = conexao.prepareStatement(sqlBusca)) {
            stmtBusca.setString(1, nomeProduto);

            try (ResultSet rs = stmtBusca.executeQuery()) {
                if (rs.next()) {
                    int idProduto = rs.getInt("id_produto");
                    int estoqueAtual = rs.getInt("qt_produto");
                    double preco = rs.getDouble("vl_preco");

                    if (estoqueAtual >= quantidadeVendida) {
                        int novoEstoque = estoqueAtual - quantidadeVendida;

                        // Atualiza estoque
                        try (PreparedStatement stmtAtualiza = conexao.prepareStatement(sqlAtualiza)) {
                            stmtAtualiza.setInt(1, novoEstoque);
                            stmtAtualiza.setInt(2, idProduto);
                            stmtAtualiza.executeUpdate();
                        }

                        double subtotal = preco * quantidadeVendida;

                        return new ResultadoVenda(
                                true,
                                "Venda realizada com sucesso!",
                                idProduto,
                                subtotal
                        );

                    } else {
                        return new ResultadoVenda(
                                false,
                                "Estoque insuficiente! Disponível: " + estoqueAtual,
                                -1,
                                0
                        );
                    }
                } else {
                    return new ResultadoVenda(
                            false,
                            "Produto não encontrado.",
                            -1,
                            0
                    );
                }
            }
        } catch (SQLException e) {
            return new ResultadoVenda(
                    false,
                    "Erro ao realizar venda: " + e.getMessage(),
                    -1,
                    0
            );
        }
    }
}
