package org.example.resource;

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

    //fazer o update
    //fazer o delete
}
