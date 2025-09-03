package org.example.dao;

import java.sql.*;

import org.example.factory.Factory;

public class VendaDAO {
    private Connection conexao;

    public VendaDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    public void realizarVenda(String nomeProduto, int quantidadeVendida) {
        String sqlBusca = "SELECT id_produto, qt_produto, vl_preco FROM t_estoque WHERE nm_produto = ?";
        String sqlAtualiza = "UPDATE t_estoque SET qt_produto = ? WHERE id_produto = ?";

        try (
                PreparedStatement stmtBusca = conexao.prepareStatement(sqlBusca)
        ) {
            stmtBusca.setString(1, nomeProduto);
            try (ResultSet rs = stmtBusca.executeQuery()) {
                if (rs.next()) {
                    int idProduto = rs.getInt("id_produto");
                    int estoqueAtual = rs.getInt("qt_produto");
                    double preco = rs.getDouble("vl_preco");

                    if (estoqueAtual >= quantidadeVendida) {
                        int novoEstoque = estoqueAtual - quantidadeVendida;

                        try (PreparedStatement stmtAtualiza = conexao.prepareStatement(sqlAtualiza)) {
                            stmtAtualiza.setInt(1, novoEstoque);
                            stmtAtualiza.setInt(2, idProduto);
                            stmtAtualiza.executeUpdate();
                        }

                        double subtotal = preco * quantidadeVendida;

                        // Registrar venda
                        System.out.println("Venda realizada com sucesso!!");
                        System.out.printf("Produto: %s | Quantidade: %d | Subtotal: R$ %.2f%n",
                                nomeProduto, quantidadeVendida, subtotal);
                    } else {
                        System.out.println("Estoque insuficiente! Estoque atual: " + estoqueAtual);
                    }
                } else {
                    System.out.println("Produto não encontrado.");
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao realizar venda: " + e.getMessage());
        }
    }
}


