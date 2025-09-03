package org.example.factory;

import java.sql.*;

public class Factory {
    public static Connection getConnection() throws SQLException {
        String url = System.getenv("DB_URL");
        String user = System.getenv("DB_USER");
        String password = System.getenv("DB_PASSWORD");

        System.out.println("Conectando ao banco com URL: " + url);

        return DriverManager.getConnection(url, user, password);
    }
}