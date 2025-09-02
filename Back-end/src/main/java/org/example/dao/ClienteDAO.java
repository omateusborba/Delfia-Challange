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
}
