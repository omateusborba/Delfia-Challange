import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class ListaProdutos {
    public static Map<String, List<Integer>> produtos = new HashMap<>();

    static {
        //Dados de estoque, ficticios(por hora)
        produtos.put("Empadão de frango", new ArrayList<>(List.of(25, 20)));
        produtos.put("Torta folhada", new ArrayList<>(List.of(25, 5)));
        produtos.put("Empadas", new ArrayList<>(List.of(15, 10)));
        produtos.put("Pão de queijo tradicional", new ArrayList<>(List.of(25, 12)));
        produtos.put("Panqueca", new ArrayList<>(List.of(25, 35)));
        produtos.put("Pão de queijo recheado", new ArrayList<>(List.of(28, 22)));
        produtos.put("Escondidinho de mandioca", new ArrayList<>(List.of(22, 8)));
        produtos.put("Lasanha", new ArrayList<>(List.of(25, 0)));
        produtos.put("Pastel de Angu", new ArrayList<>(List.of(18, 15)));
        produtos.put("Bolinho fit de frango", new ArrayList<>(List.of(18, 6)));
    }

    //retorna os produtos
    public Map<String, List<Integer>> getProdutos(){
        return produtos;
    }

    //adiciona os produtos na lista
    public void adicionarProduto(String chave, int valor, int quantidade){
        produtos.put(chave, new ArrayList<>(List.of(valor, quantidade)));
    }

    //pega o preço dos produtos
    public Integer getPrecoProduto(String nomeProduto) {
        if (produtos.containsKey(nomeProduto)) {
            return produtos.get(nomeProduto).get(0); // O preço está no índice 0 da List
        } else {
            System.out.println("Produto não encontrado: " + nomeProduto);
            return null; // Ou você pode lançar uma exceção
        }
    }

    //calcula o subtotal da venda
    public void calcularSubtotal(String nomeProduto, int quantidadeVendida) {
        Integer preco = getPrecoProduto(nomeProduto);
        if (preco != null) {
            int subtotal = preco * quantidadeVendida;
            System.out.printf("Subtotal de %d unidades de %s: R$%.2f%n", quantidadeVendida, nomeProduto, (double) subtotal);
        }
    }

    //pega a quantidade em estoque de um produto
    public Integer getQuantidadeProduto(String nomeProduto) {
        if (produtos.containsKey(nomeProduto)) {
            return produtos.get(nomeProduto).get(1);
        } else {
            System.out.println("Produto não encontrado: " + nomeProduto);
            return null;
        }
    }

    //atualiza o estoque pós-venda
    public void atualizarEstoque(String produto, int quantidadeVendida) {
        if (produtos.containsKey(produto)) {
            List<Integer> detalhesProduto = produtos.get(produto);
            int estoqueAtual = detalhesProduto.get(1);
            //condicionais para evitar que sejam vendidas quantidades que não fazem sentido
            if (quantidadeVendida > 0 && quantidadeVendida <= estoqueAtual) {
                int novoEstoque = estoqueAtual - quantidadeVendida;
                detalhesProduto.set(1, novoEstoque);
                produtos.put(produto, detalhesProduto); // Atualiza a entrada no Map
                System.out.println("Estoque de " + produto + " atualizado para: " + novoEstoque);
            } else if (quantidadeVendida <= 0) {
                System.out.println("Quantidade de venda inválida para " + produto + ".");
            } else {
                System.out.println("Estoque insuficiente de " + produto + " para a venda.");
            }
        } else {
            System.out.println("Produto não encontrado: " + produto);
        }
    }

    //exibe a lista de produtos atualizada
    public void exibeLista() {
        Menu menu = new Menu();

        Scanner scanner = new Scanner(System.in);
        System.out.println("\nLista de produtos atualizada:");
        System.out.println("---------------------------------------------------------");
        int n = 1;
        for (Map.Entry<String, List<Integer>> entry : produtos.entrySet()) {
            String produto = entry.getKey();
            int quantidade = entry.getValue().get(1); // A quantidade está no índice 1

            System.out.println(n + "-" + produto + " - Quantidade no estoque: " + quantidade);
            System.out.println("---------------------------------------------------------");
            n++;
        }
        System.out.print("Deseja voltar ao menu inicial? S/N -> ");
        String opc = scanner.nextLine();
        opc = opc.toUpperCase(); 

        if(opc.equals("S")){
            menu.exibir();
        }
    }
}