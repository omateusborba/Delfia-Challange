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
        public int idCliente;
        public int idVendedor;
        public List<ItemVenda> itens; // <<--- agora existe a lista de itens

        public static class ItemVenda {
            public String nomeProduto;
            public int quantidade;
        }
    }

    @POST
    public Response realizarVenda(VendaRequest vendaRequest) {
        try {
            VendaDAO vendaDAO = new VendaDAO();
            PedidoDAO pedidoDAO = new PedidoDAO();

            List<PedidoDAO.ItemPedido> itensPedido = new ArrayList<>();

            // Processa cada item da venda
            for (VendaRequest.ItemVenda item : vendaRequest.itens) {
                VendaDAO.ResultadoVenda resultado = vendaDAO.realizarVenda(item.nomeProduto, item.quantidade);

                if (!resultado.sucesso) {
                    return Response.status(Response.Status.BAD_REQUEST)
                            .entity(resultado.mensagem)
                            .build();
                }

                itensPedido.add(new PedidoDAO.ItemPedido(
                        resultado.idProduto,
                        item.quantidade,
                        resultado.precoUnitario // Preço unitário fixado no momento da venda
                ));
            }

            // Cria pedido com todos os itens
            int idPedido = pedidoDAO.criarPedido(
                    vendaRequest.idCliente,
                    vendaRequest.idVendedor,
                    itensPedido
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
