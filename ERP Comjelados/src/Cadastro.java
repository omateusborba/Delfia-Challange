// Como gerente, quero cadastrar produtos no estoque para controlar as entradas e saídas de mercadorias.

import java.util.Scanner;

public class Cadastro {
    ListaProdutos produtos = new ListaProdutos();
    Menu menu = new Menu();
    Scanner scanner = new Scanner(System.in);

    //Classe que adicona os produtos
    public void adicionarProduto(){
        System.out.print("Digite o produto que deseja adicionar: ");
        String novoProduto = scanner.nextLine();
        System.out.print("Digite o preço em Reais do produto: ");
        Integer preco = scanner.nextInt();
        produtos.adicionarProduto(novoProduto, preco);
        System.out.println(String.format("O produto %s, foi adicionado com sucesso", novoProduto));
        try {
            Thread.sleep(2000); // Pausa por 2 segundos
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        menu.exibir();
    }

    //Classe que exibe a lista de produtos
    public void exibeLista(){
        System.out.println("Lista de produtos atualizada:");
        int n = 1;
        for (String produto : produtos.getProdutos().keySet()) {
            System.out.println(n + "-" + produto);
            n++;
        }
    }
}