// Como gerente, quero cadastrar produtos no estoque para controlar as entradas e saídas de mercadorias.

import java.util.HashMap; //dicionário
import java.util.Map;
import java.sql.Time;
import java.util.ArrayList; //Array
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;


//Na próxima reunião, ver os preços com o Pedro, e substituir o array, por um dicionário, onde cada chave, terá um valor especifico!
public class Cadastro {
    Menu menu = new Menu();
    Scanner scanner = new Scanner(System.in);
    List<String> produtos = new ArrayList<>(Arrays.asList("Empadão de frango", "Torta folhada", "Empadas", "Pão de queijo tradicional", "Panqueca", "Pão de queijo recheado", "Escondidinho de mandioca", "Lasanha", "Pastel de Angu", "Bolinho fit de frango"));
    
    public List<String> getProdutos() {
        return produtos;
    }

    //Classe que adicona os produtos
    public void adicionarProduto(){
        System.out.print("Digite o produto que deseja adicionar: ");
        String novoProduto = scanner.nextLine();
        produtos.add(novoProduto);
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
        for (String produto : getProdutos()) {
            System.out.println(n + "-" + produto);
            n++;
        }
    }
}