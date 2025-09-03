package org.example.factory;

import java.sql.*;
public class Factory {
    private static final String URL = "jdbc:postgresql://db.fmcxxrvrksohyruomhdf.supabase.co:5432/postgres";
    private static final String USER = "postgres";
    private static final String SENHA = "FluX3RPFIAP";
    // Metodo para obter uma conexão com o banco de dados
    public static Connection getConnection() throws SQLException{
        return DriverManager.getConnection(URL, USER, SENHA);
    }
}
