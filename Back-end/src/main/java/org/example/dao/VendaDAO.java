package org.example.dao;

import org.example.factory.Factory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class VendaDAO {
    private Connection conexao;

    public VendaDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    public static class ResultadoVenda {
        public boolean sucesso;
        public String mensagem;
        public int idProduto;
        public double precoUnitario;

        public ResultadoVenda(boolean sucesso, String mensagem, int idProduto, double precoUnitario) {
            this.sucesso = sucesso;
            this.mensagem = mensagem;
            this.idProduto = idProduto;
            this.precoUnitario = precoUnitario;
        }
    }

    public ResultadoVenda realizarVenda(String nomeProduto, int quantidade) throws SQLException {
        String sqlBusca = "SELECT id_produto, qt_produto, vl_preco FROM t_estoque WHERE nm_produto = ?";
        String sqlUpdate = "UPDATE t_estoque SET qt_produto = qt_produto - ? WHERE id_produto = ?";

        try (PreparedStatement stmtBusca = conexao.prepareStatement(sqlBusca)) {
            stmtBusca.setString(1, nomeProduto);
            ResultSet rs = stmtBusca.executeQuery();

            if (rs.next()) {
                int idProduto = rs.getInt("id_produto");
                int estoqueAtual = rs.getInt("qt_produto");
                double precoUnitario = rs.getDouble("vl_preco");

                if (estoqueAtual < quantidade) {
                    return new ResultadoVenda(false,
                            "Estoque insuficiente para o produto: " + nomeProduto,
                            idProduto,
                            precoUnitario);
                }

                try (PreparedStatement stmtUpdate = conexao.prepareStatement(sqlUpdate)) {
                    stmtUpdate.setInt(1, quantidade);
                    stmtUpdate.setInt(2, idProduto);
                    stmtUpdate.executeUpdate();
                }

                return new ResultadoVenda(true,
                        "Venda realizada com sucesso para o produto: " + nomeProduto,
                        idProduto,
                        precoUnitario);
            } else {
                return new ResultadoVenda(false,
                        "Produto não encontrado: " + nomeProduto,
                        -1,
                        0.0);
            }
        }
    }
}
