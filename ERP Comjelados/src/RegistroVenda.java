// Como vendedor, quero registrar vendas e recebimentos, para que eu possa manter um histórico das transações e garantir a precisão do faturamento.
import java.util.Scanner;

public class RegistroVenda {
    Scanner scanner = new Scanner(System.in);
    Menu menu = new Menu();
    ListaProdutos produtos = new ListaProdutos();
    Cadastro cadastro = new Cadastro();

    public void venderProduto() {
        // Pegar o nome do produto        
        System.out.print("Digite o nome do produto que foi realizada a venda -> ");
        String produto = scanner.nextLine();     
        
        //Verifica se o produto está na Lista
        if(produtos.getProdutos().containsKey(produto)){
            System.out.print(String.format("Quantas unidades de %s foram vendidos?", produto.toString()));

            int quantidade = scanner.nextInt();
            int preco = produtos.getProdutos().get(produto).intValue();
            int totalVenda = quantidade * preco;
            System.out.println(String.format("Valor total da venda: R$%d,00", totalVenda));
        } else{
            System.out.println(String.format("O produto: %s, não foi encontrado, tente novamente!", produto));
            try {
                Thread.sleep(2000); // Pausa por 2 segundos
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            menu.exibir();
        }

    }
}
