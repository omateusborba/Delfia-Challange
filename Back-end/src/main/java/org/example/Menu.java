package org.example;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Scanner;

import org.example.dao.*;
import org.example.model.*;

public class Menu {
    public void exibir() throws SQLException, IOException {
        Scanner scanner = new Scanner(System.in);
        Exportar exportar = new Exportar();
        ClienteDAO clienteDAO = new ClienteDAO();
        EstoqueDAO estoqueDAO = new EstoqueDAO();
        VendaDAO vendaDAO = new VendaDAO();
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.print("""
                
                                 ███████
                             ███████████
                           ████████████         ████████ ███
                          ██████        ████    ███████  ███
                          ████  ████████████    ███      ███ ███   ██ ████  ███
                         ████  ███████████      ████████ ███ ███   ██  ███████
                         ████ █████       ██    ███      ███ ███   ██    ████
                          ███████   ████████    ███      ███ ███  ███   ██████
                          ███████  █████████    ███      ███ ████████ ████ ████
                           ████████  ██████
                            █████████████
                               ████████
                
                1.Exibir Clientes
                2.Adicionar Cliente
                3.Exibir Estoque
                4.Adicionar Produto no estoque
                5.Realizar venda
                6.Exportar Produtos
                7.Exportar Clientes
                8.Interagir com IA.
                """);

        System.out.print("--> ");

        int opc = scanner.nextInt();
        scanner.nextLine();

        switch (opc) {
            case 1:
                exibir();
                break;
            case 2:
                System.out.print("Digite o nome do cliente -> ");
                String nome = scanner.nextLine();

                System.out.print("Digite o Telefone do cliente -> ");
                String telefone = scanner.nextLine();

                System.out.print("Digite o instagram do cliente -> ");
                String instagram = scanner.nextLine();

                Cliente cliente = new Cliente(nome, telefone, instagram);
                clienteDAO.adicionaCliente(cliente);
                exibir();
                break;
            case 3:
                exibir();
                break;
            case 4:
                System.out.print("Digite o nome do produto -> ");
                String nomeProduto = scanner.nextLine();

                System.out.print("Digite a quantidade do produto -> ");
                int quantidade = scanner.nextInt();

                System.out.print("Digite o preço do produto -> ");
                float preco = scanner.nextFloat();

                Estoque estoque = new Estoque(nomeProduto, quantidade, preco);
                estoqueDAO.adicionarProduto(estoque);
                exibir();
                break;
            case 5:
                System.out.print("Digite o nome do produto -> ");
                String nomeProdutoVenda = scanner.nextLine();
                System.out.print("Digite a quantidade vendida -> ");
                int qtVendida = scanner.nextInt();
                vendaDAO.realizarVenda(nomeProdutoVenda, qtVendida);
                exibir();
                break;
            case 6:
                exportar.exportarEstoque();
                exibir();
                break;
            case 7:
                exportar.exportarClientes();
                exibir();
                break;
            case 8:
                System.out.print("Digite a sua pergunta: ");
                String mensagem = scanner.nextLine();
                GeminiChat geminiChat = new GeminiChat(mensagem);
                exibir();
                break;
            default:
                System.out.println("Opção inválida!");
                break;
        }
    }

}
