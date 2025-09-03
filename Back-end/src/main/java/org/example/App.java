package org.example;

import java.io.IOException;
import java.sql.*;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

public class App {
    public static final String BASE_URI = "http://0.0.0.0:10000/";

    public static HttpServer startServer() {
        final ResourceConfig rc = new ResourceConfig().packages("org.example");
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
    }

    public static void main(String[] args) throws SQLException {
        final HttpServer server = startServer();
        System.out.println("Servidor rodando em " + BASE_URI);
    }
}
