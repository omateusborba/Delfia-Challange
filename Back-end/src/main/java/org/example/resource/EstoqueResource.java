package org.example.resource;

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
    //fazer o delete
}
