package org.example.factory;

import java.sql.*;
public class Factory {
    public static String URL = System.getenv("DB_URL");
    public static String USER = System.getenv("DB_USER");
    public static String SENHA = System.getenv("DB_PASSWORD");
    // Metodo para obter uma conexão com o banco de dados
    public static Connection getConnection() throws SQLException{
        return DriverManager.getConnection(URL, USER, SENHA);
    }
}
