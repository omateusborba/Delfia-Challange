package org.example;

import java.io.IOException;
import java.sql.*;
import java.net.URI;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

public class App {

    public static HttpServer startServer(String baseUri) {
        final ResourceConfig rc = new ResourceConfig().packages("org.example");
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(baseUri), rc);
    }

    public static void main(String[] args) throws IOException {
        String port = System.getenv("PORT");
        if (port == null) {
            port = "8080"; // fallback local
        }
        String baseUri = "http://0.0.0.0:" + port + "/";

        final HttpServer server = startServer(baseUri);
        System.out.println("Servidor rodando em " + baseUri);

        // Mantenha o servidor vivo
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            server.shutdownNow();
        }));
        try {
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
