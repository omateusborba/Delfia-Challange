package org.example.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.dao.VendedorDAO;
import org.example.model.Vendedor;

import java.sql.SQLException;
import java.util.List;

@Path("/vendedores")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VendedorResource {

    @GET
    public List<Vendedor> listarVendedores() throws SQLException{
        VendedorDAO dao = new VendedorDAO();
        return dao.getTodosVendedores();
    }

    @POST
    public void adicionaVendedor(Vendedor vendedor) throws SQLException {
        VendedorDAO dao = new VendedorDAO();
        dao.adicionaVendedor(vendedor);
    }

    @PUT
    @Path("/{id}")
    public Response atualizaVendedor(@PathParam("id") int id, Vendedor vendedor) throws SQLException{
        VendedorDAO dao = new VendedorDAO();
        vendedor.setId_vendedor(id);
        dao.atualizaVendedor(vendedor);
        return Response.ok(vendedor).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletarVendedor(@PathParam("id") int id) throws SQLException{
        VendedorDAO dao = new VendedorDAO();
        dao.deletarVendedor(id);
        return Response.noContent().build();
    }
}
