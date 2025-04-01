// Como vendedor, quero registrar vendas e recebimentos, para que eu possa manter um histórico das transações e garantir a precisão do faturamento.
import java.util.Scanner;

public class RegistroVenda {
    Scanner scanner = new Scanner(System.in);
    Menu menu = new Menu();
    Cadastro cadastro = new Cadastro();

    public void venderProduto() {
        // Pegar o nome do produto
        System.out.print("Digite o nome do produto que foi realizada a venda -> ");
        String produto = scanner.nextLine();

        // Verificar se existe na lista
        if (cadastro.getProdutos().contains(produto)) {
            System.out.println(String.format("A venda do produto %s foi realizada com sucesso", produto));

        } else {
            System.out.println(String.format("Produto %s não foi encontrado", produto));
        }

    }
}
