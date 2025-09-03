package org.example.resource;

import org.example.dao.VendaDAO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;

@Path("/vendas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VendaResource {

    // DTO simples só para receber os dados da venda no corpo da requisição
    public static class VendaRequest {
        public String nomeProduto;
        public int quantidadeVendida;
    }

    @POST
    public Response realizarVenda(VendaRequest vendaRequest) {
        try {
            VendaDAO dao = new VendaDAO();
            dao.realizarVenda(vendaRequest.nomeProduto, vendaRequest.quantidadeVendida);

            return Response.ok("Venda realizada com sucesso!").build();
        } catch (SQLException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao realizar venda: " + e.getMessage())
                    .build();
        }
    }
}
