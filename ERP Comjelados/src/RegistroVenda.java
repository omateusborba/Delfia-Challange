// Como vendedor, quero registrar vendas e recebimentos, para que eu possa manter um histórico das transações e garantir a precisão do faturamento.
import java.util.InputMismatchException;
import java.util.Scanner;

public class RegistroVenda {
    Scanner scanner = new Scanner(System.in);
    Menu menu = new Menu();
    ListaProdutos produtos = new ListaProdutos();
    Cadastro cadastro = new Cadastro();

    public void venderProduto() {
        System.out.print("Digite o nome do produto que foi realizada a venda -> ");
        String produtoVendido = scanner.nextLine();

        if (produtos.getProdutos().containsKey(produtoVendido)) {
            System.out.print(String.format("Quantas unidades de %s foram vendidas? -> ", produtoVendido));
            try {
                int quantidadeVendida = scanner.nextInt();
                scanner.nextLine(); // Consumir a quebra de linha

                if (quantidadeVendida > 0) {
                    produtos.calcularSubtotal(produtoVendido, quantidadeVendida);
                    produtos.atualizarEstoque(produtoVendido, quantidadeVendida);
                    try {
                        Thread.sleep(2000); // Pausa por 2 segundos
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    menu.exibir();
                } else {
                    System.out.println("A quantidade vendida deve ser maior que zero.");
                }

            } catch (InputMismatchException e) {
                System.out.println("Erro: Por favor, digite um número inteiro para a quantidade.");
                scanner.nextLine(); // Limpar o buffer do scanner
            }

        } else {
            System.out.println(String.format("O produto: %s, não foi encontrado, tente novamente!", produtoVendido));
            try {
                Thread.sleep(2000); // Pausa por 2 segundos
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            menu.exibir();
        }
    }
}
