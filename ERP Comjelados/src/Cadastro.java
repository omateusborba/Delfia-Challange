// Como gerente, quero cadastrar produtos no estoque para controlar as entradas e saídas de mercadorias.

import java.util.List;
import java.util.Map;
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

    // Classe que exibe a lista de produtos
    public void exibeLista() {
        System.out.println("\nLista de produtos atualizada:");
        System.out.println("---------------------------------------------------------");
        int n = 1;
        for (Map.Entry<String, List<Integer>> entry : produtos.getProdutos().entrySet()) {
            String produto = entry.getKey();
            int quantidade = entry.getValue().get(1); // A quantidade está no índice 1

            System.out.println(n + "-" + produto + " - Quantidade no estoque: " + quantidade);
            System.out.println("---------------------------------------------------------");
            n++;
        }
        System.out.print("Deseja voltar ao menu inicial? S/N ->");
        String opc = scanner.nextLine();
        opc.toUpperCase();

        if(opc.contains("s")){
            menu.exibir();
        }       
    }
}