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
            System.out.println("Chamando listarClientes()");
            ClienteDAO dao = new ClienteDAO();
            List<Cliente> lista = dao.getTodosClientes();
            return Response.ok(lista).build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao listar clientes").build();
        }
    }

    @POST
    public Response adicionarCliente(Cliente cliente) {
        try {
            System.out.println("Chamando adicionarCliente()");
            ClienteDAO dao = new ClienteDAO();
            dao.adicionaCliente(cliente);
            return Response.status(Response.Status.CREATED).entity(cliente).build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao adicionar cliente").build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response atualizarCliente(@PathParam("id") int id, Cliente cliente) {
        try {
            System.out.println("Chamando atualizarCliente() para ID: " + id);
            ClienteDAO dao = new ClienteDAO();
            cliente.setId_cliente(id);
            dao.atualizaCliente(cliente);
            return Response.ok(cliente).build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao atualizar cliente").build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deletarCliente(@PathParam("id") int id) {
        try {
            System.out.println("Chamando deletarCliente() para ID: " + id);
            ClienteDAO dao = new ClienteDAO();
            dao.deletarCliente(id);
            return Response.noContent().build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.serverError().entity("Erro ao deletar cliente").build();
        }
    }
}
