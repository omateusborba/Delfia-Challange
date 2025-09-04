package org.example.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.example.factory.Factory;
import org.example.model.Cliente;

public class ClienteDAO {
    private Connection conexao;

    public ClienteDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    public void adicionaCliente(Cliente cliente) {
        String sql = "INSERT INTO t_cliente (nm_cliente, nr_telefone, tx_instagram) VALUES (?, ?, ?)";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, cliente.getNome());
            stmt.setString(2, cliente.getTelefone());
            stmt.setString(3, cliente.getInstagram());

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao adicionar cliente", e);
        }
    }

    public List<Cliente> getTodosClientes() {
        List<Cliente> lista = new ArrayList<>();
        String sql = "SELECT * FROM t_cliente";

        try (PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id_cliente");
                String nome = rs.getString("nm_cliente");
                String telefone = rs.getString("nr_telefone");
                String instagram = rs.getString("tx_instagram");

                Cliente cliente = new Cliente(id, nome, telefone, instagram);
                lista.add(cliente);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao obter clientes", e);
        }

        return lista;
    }

    public boolean atualizaCliente(Cliente cliente){
        String sql = "UPDATE t_cliente SET nm_cliente = ?, nr_telefone = ?, tx_instagram = ? WHERE id_cliente = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, cliente.getNome());
            stmt.setString(2, cliente.getTelefone());
            stmt.setString(3, cliente.getInstagram());
            stmt.setInt(4, cliente.getId_cliente());

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
        } catch (SQLException e){
            System.err.println("Erro ao atualizar cliente: " + e.getMessage());
            return false;
        }
    }

    public boolean deletarCliente(int idCliente) {
        String sql = "DELETE FROM t_cliente WHERE id_cliente = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idCliente);

            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
        } catch (SQLException e){
            System.err.println("Erro ao deletar cliente: " + e.getMessage());
            return false;
        }
    }
}
