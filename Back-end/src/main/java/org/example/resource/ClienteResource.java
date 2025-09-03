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
    public Response listarClientes() {
        try {
            ClienteDAO dao = new ClienteDAO();
            List<Cliente> clientes = dao.getTodosClientes();
            return Response.ok(clientes).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao listar clientes: " + e.getMessage()).build();
        }
    }

    @POST
    public Response adicionarCliente(Cliente cliente) {
        try {
            ClienteDAO dao = new ClienteDAO();
            dao.adicionaCliente(cliente);
            return Response.status(Response.Status.CREATED).entity(cliente).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao adicionar cliente: " + e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response atualizarCliente(@PathParam("id") int id, Cliente cliente) {
        try {
            ClienteDAO dao = new ClienteDAO();
            cliente.setId_cliente(id);
            dao.atualizaCliente(cliente);
            return Response.ok(cliente).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao atualizar cliente: " + e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deletarCliente(@PathParam("id") int id) {
        try {
            ClienteDAO dao = new ClienteDAO();
            dao.deletarCliente(id);
            return Response.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao deletar cliente: " + e.getMessage()).build();
        }
    }
}
