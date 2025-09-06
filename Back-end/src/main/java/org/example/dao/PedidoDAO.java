package org.example.dao;

import org.example.factory.Factory;

import java.sql.*;
import java.time.LocalDate;
import java.util.List;

public class PedidoDAO {
    private Connection conexao;

    public PedidoDAO() throws SQLException {
        this.conexao = Factory.getConnection();
    }

    public int criarPedido(int idCliente, int idVendedor, List<ItemPedido> itens) throws SQLException {
        String sqlPedido = "INSERT INTO t_pedido (t_cliente_id_cliente, t_login_id_vendedor, dt_pedido, vl_total) " +
                "VALUES (?, ?, ?, ?) RETURNING id_pedido";
        String sqlItem = "INSERT INTO t_item_pedido (t_pedido_id_pedido, t_estoque_id_produto, qt_item, vl_unitario) " +
                "VALUES (?, ?, ?, ?)";

        // calcula o valor total do pedido (somando quantidade * valorUnitario)
        double valorTotal = itens.stream()
                .mapToDouble(i -> i.quantidade * i.valorUnitario)
                .sum();

        int idPedido = -1;

        // cria o pedido na tabela t_pedido
        try (PreparedStatement stmtPedido = conexao.prepareStatement(sqlPedido)) {
            stmtPedido.setInt(1, idCliente);
            stmtPedido.setInt(2, idVendedor);
            stmtPedido.setDate(3, Date.valueOf(LocalDate.now()));
            stmtPedido.setDouble(4, valorTotal);

            try (ResultSet rs = stmtPedido.executeQuery()) {
                if (rs.next()) {
                    idPedido = rs.getInt("id_pedido");
                }
            }
        }

        // insere os itens na tabela t_item_pedido
        try (PreparedStatement stmtItem = conexao.prepareStatement(sqlItem)) {
            for (ItemPedido item : itens) {
                stmtItem.setInt(1, idPedido);
                stmtItem.setInt(2, item.idProduto);
                stmtItem.setInt(3, item.quantidade);
                stmtItem.setDouble(4, item.valorUnitario); // salva o preço unitário
                stmtItem.addBatch();
            }
            stmtItem.executeBatch();
        }

        return idPedido;
    }

    /**
     * Classe auxiliar para representar itens do pedido
     */
    public static class ItemPedido {
        public int idProduto;
        public int quantidade;
        public double valorUnitario;

        public ItemPedido(int idProduto, int quantidade, double valorUnitario) {
            this.idProduto = idProduto;
            this.quantidade = quantidade;
            this.valorUnitario = valorUnitario;
        }

        // opcional: calcular subtotal
        public double getSubtotal() {
            return quantidade * valorUnitario;
        }
    }
}
