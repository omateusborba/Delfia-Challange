// Como gerente, quero cadastrar produtos e clientes

import java.util.Scanner;

public class Cadastro {
    ListaProdutos produtos = new ListaProdutos();
    Menu menu = new Menu();
    Scanner scanner = new Scanner(System.in);

    // Classe que adicona os produtos
    public void adicionarProduto() {
        System.out.print("Digite o produto que deseja adicionar: ");
        String novoProduto = scanner.nextLine();

        System.out.print("Digite o preço em Reais do produto: ");
        Integer preco = scanner.nextInt();

        System.out.print("Digite a quantidade no estoque: ");
        Integer quantidade = scanner.nextInt();

        produtos.adicionarProduto(novoProduto, preco, quantidade);
        System.out.println(String.format("O produto %s, foi adicionado com sucesso", novoProduto));

        try {
            Thread.sleep(2000); // Pausa por 2 segundos
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        menu.exibir();
    }

    public void cadastrarCliente(){
        Clientes clientes = new Clientes();

        //Pegar o nome do cliente 
        System.out.print("Digite o nome do Cliente: ");
        String nome = scanner.nextLine();

        //pegar forma de contato
        System.out.print("Digite a forma de contato(Telefone, E-mail ou instagram): ");
        String contato = scanner.nextLine();

        //adiciona o cliente na lista 
        clientes.adicionaCliente(nome, contato);

        //mensagem pós cadastro
        System.out.printf("O cliente %s, foi adicionado com sucesso!", nome);

        try {
            Thread.sleep(3000); // Pausa por 2 segundos
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        menu.areaCliente();
    }
}