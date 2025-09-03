package org.example.resource;

import jakarta.ws.rs.core.Response;
import org.example.dao.ClienteDAO;
import org.example.model.Cliente;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;


@Path("/clientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClienteResource {

    @GET
    public List<Cliente> listarClientes() throws SQLException {
        ClienteDAO dao = new ClienteDAO();
        return  dao.getTodosClientes();
    }

    @POST
    public void adicionarCliente(Cliente cliente) throws SQLException {
        ClienteDAO dao = new ClienteDAO();
        dao.adicionaCliente(cliente);
    }

    @PUT
    @Path("/{id}")
    public Response atualizarCliente(@PathParam("id") int id, Cliente cliente) throws SQLException{
        ClienteDAO dao = new ClienteDAO();
        cliente.setId_cliente(id);
        dao.atualizaCliente(cliente);
        return Response.ok(cliente).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletarCliente(@PathParam("id") int id) throws SQLException{
        ClienteDAO dao = new ClienteDAO();
        dao.deletarCliente(id);
        return Response.noContent().build();
    }
}
