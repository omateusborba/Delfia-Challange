package org.example.resource;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
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
}
