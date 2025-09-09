package org.example.dao;
import org.example.factory.Factory;
import org.example.model.Vendedor;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VendedorDAO {

    private Connection conexao;

    public VendedorDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    public List<Vendedor> getTodosVendedores() {
        List<Vendedor> lista = new ArrayList<>();
        String sql = "SELECT * FROM t_login";

        try (PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int idVendedor = rs.getInt("id_vendedor");
                String nome = rs.getString("nm_usuario");
                String email = rs.getString("tx_email");
                String senha = rs.getString("tx_senha"); // PEGUE A SENHA TAMBÉM
                boolean isGerente = rs.getBoolean("is_gerente");

                // Use o construtor correto que espera SENHA, não EMAIL
                Vendedor vendedor = new Vendedor(idVendedor, nome, senha, isGerente);
                vendedor.setTx_email(email); // Defina o email separadamente
                lista.add(vendedor);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter vendedores: " + e.getMessage());
            e.printStackTrace();
        }

        return lista;
    }

    public void adicionaVendedor(Vendedor vendedor){
        String sql = "INSERT INTO t_login (nm_usuario, tx_email, tx_senha) VALUES (?, ?, ?)";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, vendedor.getNm_usuario());
            stmt.setString(2, vendedor.getTx_email());
            stmt.setString(3, vendedor.getTx_senha());

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao adicionar vendedor", e);
        }
    }

    public boolean atualizaVendedor(Vendedor vendedor){
        String sql = "UPDATE t_login SET nm_usuario = ?, tx_email = ?, tx_senha = ? WHERE id_vendedor = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, vendedor.getNm_usuario());
            stmt.setString(2, vendedor.getTx_email());
            stmt.setString(3, vendedor.getTx_senha());
            stmt.setInt(4, vendedor.getId_vendedor());

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
        } catch (SQLException e){
            System.err.println("Erro ao atualizar vendedor: " + e.getMessage());
            return false;
        }
    }

    public boolean deletarVendedor(int idVendedor) {
        String sql = "DELETE FROM t_login WHERE id_vendedor = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idVendedor);

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
        } catch (SQLException e){
            System.err.println("Erro ao deletar vendedor: " + e.getMessage());
            return false;
        }
    }
}