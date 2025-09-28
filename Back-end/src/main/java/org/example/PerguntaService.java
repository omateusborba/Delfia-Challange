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
                SELECT nome, SUM(valor_total) AS total
                FROM vendas v
                JOIN clientes c ON v.cliente_id = c.id
                GROUP BY nome
                ORDER BY total DESC
                LIMIT 5
                """;
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                sb.append("- ")
                        .append(rs.getString("nome"))
                        .append(": R$ ")
                        .append(rs.getDouble("total"))
                        .append("\n");
            }
        }
        return sb.toString();
    }

    private static String consultaProdutosQueMaisVendidos(Connection conn) throws SQLException {
        StringBuilder sb = new StringBuilder();
        String sql = """
                SELECT p.nome, SUM(iv.quantidade) AS qtd
                FROM itens_venda iv
                JOIN produtos p ON iv.produto_id = p.id
                GROUP BY p.nome
                ORDER BY qtd DESC
                LIMIT 5
                """;
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                sb.append("- ")
                        .append(rs.getString("nome"))
                        .append(": ")
                        .append(rs.getInt("qtd"))
                        .append(" unidades\n");
            }
        }
        return sb.toString();
    }

    private static String consultaProdutosEstoqueBaixo(Connection conn) throws SQLException {
        StringBuilder sb = new StringBuilder();
        String sql = "SELECT nome, quantidade FROM produtos WHERE quantidade < 10 ORDER BY quantidade ASC";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                sb.append("- ")
                        .append(rs.getString("nome"))
                        .append(": ")
                        .append(rs.getInt("quantidade"))
                        .append(" em estoque\n");
            }
        }
        return sb.toString();
    }
}
