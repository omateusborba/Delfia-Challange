package org.example.dao;

import org.example.factory.Factory;
import org.example.model.Pedido;
import org.example.model.ItemVenda;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
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

        // calcula o valor total do pedido corretamente
        double valorTotal = itens.stream()
                .mapToDouble(i -> i.getSubtotal())
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

        public double getSubtotal() {
            return quantidade * valorUnitario;
        }
    }

    private String getNomeClientePorId(int idCliente) {
        String sql = "SELECT nm_cliente FROM t_cliente WHERE id_cliente = ?";
        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idCliente);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getString("nm_cliente");
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar cliente " + idCliente + ": " + e.getMessage());
        }
        return null;
    }

    public List<Pedido> getTodosPedidos() {
        List<Pedido> lista = new ArrayList<>();
        String sql = "SELECT p.id_pedido, " +
                "c.nm_cliente as cliente, " +
                "l.nm_usuario as vendedor, " +
                "p.dt_pedido, " +
                "p.vl_total, " +
                "(SELECT COUNT(*) FROM t_item_pedido ip WHERE ip.t_pedido_id_pedido = p.id_pedido) as total_itens, " +
                "p.t_cliente_id_cliente, " +
                "p.t_login_id_vendedor " +
                "FROM t_pedido p " +
                "LEFT JOIN t_cliente c ON p.t_cliente_id_cliente = c.id_cliente " +
                "LEFT JOIN t_login l ON p.t_login_id_vendedor = l.id_vendedor " +
                "ORDER BY p.dt_pedido DESC";

        try (PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Pedido pedido = new Pedido();
                pedido.setId_pedido(rs.getInt("id_pedido"));
                pedido.setT_cliente_id_cliente(rs.getInt("t_cliente_id_cliente"));
                pedido.setT_login_id_vendedor(rs.getInt("t_login_id_vendedor"));

                // Cliente
                String cliente = rs.getString("cliente");
                if (cliente == null) {
                    cliente = getNomeClientePorId(pedido.getT_cliente_id_cliente());
                }
                pedido.setCliente(cliente != null ? cliente : "Cliente " + pedido.getT_cliente_id_cliente());

                // Vendedor
                pedido.setVendedor(rs.getString("vendedor"));
                if (pedido.getVendedor() == null) {
                    pedido.setVendedor("Vendedor " + pedido.getT_login_id_vendedor());
                }

                pedido.setDt_pedido(rs.getString("dt_pedido"));
                pedido.setVl_total(rs.getFloat("vl_total"));
                pedido.setTotal_itens(rs.getInt("total_itens"));

                // Itens - Agora convertendo para List<ItemVenda>
                List<ItemVenda> itensPedido = getItensPedidoComoObjetos(pedido.getId_pedido());
                pedido.setItens(itensPedido != null ? itensPedido : new ArrayList<>());

                lista.add(pedido);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter pedidos: " + e.getMessage());
            e.printStackTrace();
        }

        return lista;
    }

    // NOVO MÉTODO: Retorna itens como objetos ItemVenda
    public List<ItemVenda> getItensPedidoComoObjetos(int idPedido) {
        List<ItemVenda> itens = new ArrayList<>();
        String sql = "SELECT e.nm_produto, ip.qt_item, ip.vl_unitario " +
                "FROM t_item_pedido ip " +
                "INNER JOIN t_estoque e ON ip.t_estoque_id_produto = e.id_produto " +
                "WHERE ip.t_pedido_id_pedido = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idPedido);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                ItemVenda item = new ItemVenda();
                item.setNomeProduto(rs.getString("nm_produto"));
                item.setQuantidade(rs.getInt("qt_item"));
                item.setValorUnitario(rs.getDouble("vl_unitario"));
                itens.add(item);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter itens do pedido " + idPedido + ": " + e.getMessage());
            itens = getItensBasicosPedidoComoObjetos(idPedido);
        }

        return itens;
    }

    // NOVO MÉTODO: Fallback para itens como objetos
    private List<ItemVenda> getItensBasicosPedidoComoObjetos(int idPedido) {
        List<ItemVenda> itens = new ArrayList<>();
        String sql = "SELECT t_estoque_id_produto, qt_item, vl_unitario " +
                "FROM t_item_pedido " +
                "WHERE t_pedido_id_pedido = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idPedido);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                ItemVenda item = new ItemVenda();
                item.setNomeProduto("Produto " + rs.getInt("t_estoque_id_produto"));
                item.setQuantidade(rs.getInt("qt_item"));
                item.setValorUnitario(rs.getDouble("vl_unitario"));
                itens.add(item);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter itens básicos do pedido " + idPedido + ": " + e.getMessage());
        }

        return itens;
    }

    // MÉTODO ORIGINAL (mantido para compatibilidade se necessário)
    public List<String> getItensPedido(int idPedido) {
        List<String> itens = new ArrayList<>();
        String sql = "SELECT e.nm_produto, ip.qt_item, ip.vl_unitario " +
                "FROM t_item_pedido ip " +
                "INNER JOIN t_estoque e ON ip.t_estoque_id_produto = e.id_produto " +
                "WHERE ip.t_pedido_id_pedido = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idPedido);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                String item = rs.getString("nm_produto") + " (" +
                        rs.getInt("qt_item") + " x R$ " +
                        String.format("%.2f", rs.getDouble("vl_unitario")) + ")";
                itens.add(item);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter itens do pedido " + idPedido + ": " + e.getMessage());
            itens = getItensBasicosPedido(idPedido);
        }

        return itens;
    }

    // MÉTODO ORIGINAL (mantido para compatibilidade)
    private List<String> getItensBasicosPedido(int idPedido) {
        List<String> itens = new ArrayList<>();
        String sql = "SELECT t_estoque_id_produto, qt_item, vl_unitario " +
                "FROM t_item_pedido " +
                "WHERE t_pedido_id_pedido = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, idPedido);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                String item = "Produto " + rs.getInt("t_estoque_id_produto") + " (" +
                        rs.getInt("qt_item") + " x R$ " +
                        String.format("%.2f", rs.getDouble("vl_unitario")) + ")";
                itens.add(item);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao obter itens básicos do pedido " + idPedido + ": " + e.getMessage());
        }

        return itens;
    }

    public boolean removerPedido(int idPedido) throws SQLException {
        String sqlItens = "DELETE FROM t_item_pedido WHERE t_pedido_id_pedido = ?";
        String sqlPedido = "DELETE FROM t_pedido WHERE id_pedido = ?";

        try (PreparedStatement stmtItens = conexao.prepareStatement(sqlItens);
             PreparedStatement stmtPedido = conexao.prepareStatement(sqlPedido)) {

            stmtItens.setInt(1, idPedido);
            stmtItens.executeUpdate();

            stmtPedido.setInt(1, idPedido);
            int linhasAfetadas = stmtPedido.executeUpdate();

            return linhasAfetadas > 0;
        }
    }
}