package org.example.resource;

import org.example.dao.PedidoDAO;
import org.example.dao.VendaDAO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.model.Pedido;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Path("/vendas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VendaResource {

    // DTO simples só para receber os dados da venda no corpo da requisição
    public static class VendaRequest {
        public String nomeProduto;
        public int quantidadeVendida;
        public int idCliente;
        public int idVendedor;
    }

    @POST
    public Response realizarVenda(VendaRequest vendaRequest) {
        try {
            VendaDAO vendaDAO = new VendaDAO();
            PedidoDAO pedidoDAO = new PedidoDAO();

            // 1. Valida e baixa estoque
            VendaDAO.ResultadoVenda resultado =
                    vendaDAO.realizarVenda(vendaRequest.nomeProduto, vendaRequest.quantidadeVendida);

            if (!resultado.sucesso) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(resultado.mensagem)
                        .build();
            }

            // 2. Cria lista de itens do pedido
            List<PedidoDAO.ItemPedido> itens = new ArrayList<>();
            itens.add(new PedidoDAO.ItemPedido(
                    resultado.idProduto,
                    vendaRequest.quantidadeVendida,
                    resultado.subtotal
            ));

            // 3. Cria pedido
            int idPedido = pedidoDAO.criarPedido(
                    vendaRequest.idCliente,
                    vendaRequest.idVendedor,
                    itens
            );

            return Response.ok("Venda registrada com sucesso! Pedido ID: " + idPedido).build();

        } catch (SQLException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao realizar venda: " + e.getMessage())
                    .build();
        }
    }

    @GET
    public List<Pedido> listarVendas() throws SQLException {
        PedidoDAO dao = new PedidoDAO();
        return dao.getTodosPedidos();
    }

    @DELETE
    @Path("/{idPedido}")
    public Response removerVenda(@PathParam("idPedido") int idPedido) {
        try {
            PedidoDAO pedidoDAO = new PedidoDAO();
            boolean removido = pedidoDAO.removerPedido(idPedido);

            if (removido) {
                return Response.ok("Venda removida com sucesso!").build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Venda não encontrada com ID: " + idPedido)
                        .build();
            }

        } catch (SQLException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao remover venda: " + e.getMessage())
                    .build();
        }
    }
}