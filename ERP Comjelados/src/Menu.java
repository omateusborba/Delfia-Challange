import java.util.Scanner;

public class Menu {
    Scanner scanner = new Scanner(System.in);
    public void exibir(){
        Cadastro cadastro = new Cadastro();
        RegistroVenda venda = new RegistroVenda();
        ListaProdutos produtos = new ListaProdutos();
        System.out.println("""
                
███████╗██╗░░░░░██╗░░░██╗██╗░░██╗
██╔════╝██║░░░░░██║░░░██║╚██╗██╔╝
█████╗░░██║░░░░░██║░░░██║░╚███╔╝░
██╔══╝░░██║░░░░░██║░░░██║░██╔██╗░
██║░░░░░███████╗╚██████╔╝██╔╝╚██╗
╚═╝░░░░░╚══════╝░╚═════╝░╚═╝░░╚═╝
                """);

    //Finalizar as outras funcionalidades
    System.out.println("1.Cadastrar novo produto");
    System.out.println("2.Registrar venda");
    System.out.println("3.Exibir estoque");
    System.out.println("4.Cadastrar Clientes");
    System.out.println("5.Sair");
    System.out.print("\nDigite a Opção Desejada -> ");
    int opc = scanner.nextInt();
    
    if (opc == 1) {
        cadastro.adicionarProduto();
    } else if (opc == 2) {
        venda.venderProduto();
    } else if (opc == 3){
        cadastro.exibeLista();
    }

    }
}
