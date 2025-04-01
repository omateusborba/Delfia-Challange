import java.util.Scanner;

public class Menu {
    public void exibir(){
        Cadastro cadastro = new Cadastro();
        Scanner scanner = new Scanner(System.in);
        RegistroVenda venda = new RegistroVenda();
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
    System.out.println("3.Cadastrar Clientes");
    System.out.println("4.Sair");
    System.out.print("\nDigite a Opção Desejada -> ");
    int opc = scanner.nextInt();
    
    if (opc == 1) {
        cadastro.adicionarProduto();
    } else if (opc == 2) {
        venda.venderProduto();
    }

    }
}
