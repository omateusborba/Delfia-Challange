package org.example;

import java.sql.*;

public class PerguntaService {

    public static String prepararPrompt(Connection conn, String pergunta) throws Exception {
        String dados = "";
        String prompt = "";

        switch (pergunta.toLowerCase()) {
            case "clientes":
                dados = consultaClientesQueMaisCompram(conn);
                prompt = "Com base nos dados abaixo, responda: quais são os clientes que mais compram?\n\n" + dados;
                break;

            case "produtos":
                dados = consultaProdutosQueMaisVendidos(conn);
                prompt = "Com base nos dados abaixo, responda: quais são os produtos que mais vendem?\n\n" + dados;
                break;

            case "estoque":
                dados = consultaProdutosEstoqueBaixo(conn);
                prompt = "Com base nos dados abaixo, responda: quais produtos estão perto de acabar no estoque?\n\n" + dados;
                break;

            case "estrategia":
                String clientes = consultaClientesQueMaisCompram(conn);
                String produtos = consultaProdutosQueMaisVendidos(conn);
                String estoque = consultaProdutosEstoqueBaixo(conn);

                prompt = """
                        Tenho os seguintes dados:
                        - Clientes que mais compram:
                        %s
                        - Produtos mais vendidos:
                        %s
                        - Produtos com estoque baixo:
                        %s
                        
                        Analise os dados e sugira a melhor estratégia de negócio para este mês.
                        """.formatted(clientes, produtos, estoque);
                break;

            default:
                prompt = "Pergunta inválida. As opções são: clientes, produtos, estoque ou estrategia.";
        }

        return prompt;
    }

    private static String consultaClientesQueMaisCompram(Connection conn) throws SQLException {
        StringBuilder sb = new StringBuilder();
        String sql = """
                SELECT c.nm_cliente, SUM(p.vl_total) AS vl_total
                                FROM t_pedido p
                                JOIN t_cliente c ON c.id_cliente = p.t_cliente_id_cliente
                                GROUP BY c.nm_cliente
                                ORDER BY vl_total DESC
                LIMIT 5
                """;
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                sb.append("- ")
                        .append(rs.getString("nm_cliente"))
                        .append(": R$ ")
                        .append(rs.getDouble("vl_total"))
                        .append("\n");
            }
        }
        return sb.toString();
    }

    private static String consultaProdutosQueMaisVendidos(Connection conn) throws SQLException {
        StringBuilder sb = new StringBuilder();
        String sql = """
                SELECT e.nm_produto, SUM(ip.qt_item) AS qt_item
                                                 FROM t_item_pedido ip
                                                 JOIN t_estoque e ON e.id_produto = ip.t_estoque_id_produto
                                                 GROUP BY e.nm_produto
                                                 ORDER BY qt_item DESC
                LIMIT 5
                """;
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                sb.append("- ")
                        .append(rs.getString("nm_produto"))
                        .append(": ")
                        .append(rs.getInt("qt_item"))
                        .append(" unidades\n");
            }
        }
        return sb.toString();
    }

    private static String consultaProdutosEstoqueBaixo(Connection conn) throws SQLException {
        StringBuilder sb = new StringBuilder();
        String sql = "SELECT nm_produto, qt_produto FROM t_estoque WHERE qt_produto < 10 ORDER BY qt_produto ASC";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                sb.append("- ")
                        .append(rs.getString("nm_produto"))
                        .append(": ")
                        .append(rs.getInt("qt_produto"))
                        .append(" em estoque\n");
            }
        }
        return sb.toString();
    }
}
