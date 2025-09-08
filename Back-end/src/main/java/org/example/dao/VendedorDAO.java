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

    // 🔹 Lista todos os produtos do estoque
    public List<Vendedor> getTodosVendedores() {
        List<Vendedor> lista = new ArrayList<>();
        String sql = "SELECT * FROM t_login";

        try (PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int idVendedor = rs.getInt("id_vendedor");
                String nome = rs.getString("nm_usuario");
                boolean isGerente = rs.getBoolean("is_gerente");

                Vendedor vendedor = new Vendedor(idVendedor, nome, isGerente);
                lista.add(vendedor);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter produtos: " + e.getMessage());
        }

        return lista;
    }

}
