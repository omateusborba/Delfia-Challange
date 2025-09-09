package org.example.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.factory.Factory;

import java.sql.*;
import java.util.*;

@Path("/relatorios")
@Produces(MediaType.APPLICATION_JSON)
public class RelatoriosResource {

    @GET
    @Path("/mais-vendidos")
    public Response getProdutosMaisVendidos() {
        try (Connection conn = Factory.getConnection()) {
            String sql = "SELECT e.nm_produto, SUM(i.qt_item) AS total_vendido " +
                    "FROM t_item_pedido i " +
                    "JOIN t_estoque e ON e.id_produto = i.t_estoque_id_produto " +
                    "GROUP BY e.nm_produto " +
                    "ORDER BY total_vendido DESC";

            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();

            List<Map<String, Object>> lista = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> item = new HashMap<>();
                item.put("nome", rs.getString("nm_produto"));
                item.put("total", rs.getInt("total_vendido"));
                lista.add(item);
            }

            return Response.ok(lista).build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/clientes-top")
    public Response getClientesQueMaisCompram() {
        try (Connection conn = Factory.getConnection()) {
            String sql = "SELECT c.nm_cliente, SUM(p.vl_total) AS total_gasto " +
                    "FROM t_pedido p " +
                    "JOIN t_cliente c ON c.id_cliente = p.t_cliente_id_cliente " +
                    "GROUP BY c.nm_cliente " +
                    "ORDER BY total_gasto DESC";

            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();

            List<Map<String, Object>> lista = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> item = new HashMap<>();
                item.put("cliente", rs.getString("nm_cliente"));
                item.put("total", rs.getDouble("total_gasto"));
                lista.add(item);
            }

            return Response.ok(lista).build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro: " + e.getMessage()).build();
        }
    }


}
