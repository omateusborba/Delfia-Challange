package org.example.dao;

import org.example.model.Estoque;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.example.factory.Factory;

public class EstoqueDAO {

    private Connection conexao;

    public EstoqueDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    // 🔹 Lista todos os produtos do estoque
    public List<Estoque> getTodosProdutos() {
        List<Estoque> lista = new ArrayList<>();
        String sql = "SELECT * FROM t_estoque";

        try (PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id_produto");
                String nome = rs.getString("nm_produto");
                int quantidade = rs.getInt("qt_produto");
                float preco = rs.getFloat("vl_preco");

                Estoque produto = new Estoque(id, nome, quantidade, preco);
                lista.add(produto);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter produtos: " + e.getMessage());
        }

        return lista;
    }

    // 🔹 Adiciona um produto novo no estoque
    public boolean adicionarProduto(Estoque estoque) {
        String sql = "INSERT INTO t_estoque (nm_produto, qt_produto, vl_preco) VALUES (?, ?, ?)";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, estoque.getNome());
            stmt.setInt(2, estoque.getQuantidade());
            stmt.setFloat(3, estoque.getPreco());

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;

        } catch (SQLException e) {
            System.err.println("Erro ao adicionar produto: " + e.getMessage());
            return false;
        }
    }

    // 🔹 Buscar produto pelo ID
    public Estoque buscarPorId(int idProduto) {
        String sql = "SELECT * FROM t_estoque WHERE id_produto = ?";
        Estoque produto = null;

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idProduto);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String nome = rs.getString("nm_produto");
                    int quantidade = rs.getInt("qt_produto");
                    float preco = rs.getFloat("vl_preco");

                    produto = new Estoque(idProduto, nome, quantidade, preco);
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar produto: " + e.getMessage());
        }

        return produto;
    }

    // 🔹 Atualizar produto
    public boolean atualizarProduto(Estoque estoque) {
        String sql = "UPDATE t_estoque SET nm_produto = ?, qt_produto = ?, vl_preco = ? WHERE id_produto = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, estoque.getNome());
            stmt.setInt(2, estoque.getQuantidade());
            stmt.setFloat(3, estoque.getPreco());
            stmt.setInt(4, estoque.getId_produto());

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0; // true se atualizou
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar produto: " + e.getMessage());
            return false;
        }
    }

    // 🔹 Deletar produto
    public boolean deletarProduto(int idProduto) {
        String sql = "DELETE FROM t_estoque WHERE id_produto = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idProduto);

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;

        } catch (SQLException e) {
            System.err.println("Erro ao deletar produto: " + e.getMessage());
            return false;
        }
    }
}
