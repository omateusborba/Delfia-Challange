package org.example.resource;

import jakarta.ws.rs.core.Response;
import org.example.dao.EstoqueDAO;
import org.example.model.Estoque;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/estoque")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EstoqueResource {

    @GET
    public List<Estoque> listarEstoque() throws SQLException{
        EstoqueDAO dao = new EstoqueDAO();
        return dao.getTodosProdutos();
    }

    @POST
    public boolean adicionarProduto(Estoque produto) throws SQLException{
        EstoqueDAO dao = new EstoqueDAO();
        return dao.adicionarProduto(produto);
    }

    //fazer o update
    @PUT
    @Path("/{id}")
    public Response atualizaEstoque(@PathParam("id") int id, Estoque produto) throws SQLException{
        EstoqueDAO dao = new EstoqueDAO();
        produto.setId_produto(id);
        dao.atualizarProduto(produto);
        return Response.ok(produto).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletarProduto(@PathParam("id") int id) throws SQLException{
        EstoqueDAO dao = new EstoqueDAO();
        dao.deletarProduto(id);
        return Response.noContent().build();
    }
}
