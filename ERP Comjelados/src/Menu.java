import java.util.Scanner;

public class Menu {
    Scanner scanner = new Scanner(System.in);

    public void exibir() {
        Cadastro cadastro = new Cadastro();
        RegistroVenda venda = new RegistroVenda();
        ListaProdutos produtos = new ListaProdutos();
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");
        
        System.out.println("""

                ███████╗██╗░░░░░██╗░░░██╗██╗░░██╗
                ██╔════╝██║░░░░░██║░░░██║╚██╗██╔╝
                █████╗░░██║░░░░░██║░░░██║░╚███╔╝░
                ██╔══╝░░██║░░░░░██║░░░██║░██╔██╗░
                ██║░░░░░███████╗╚██████╔╝██╔╝╚██╗
                ╚═╝░░░░░╚══════╝░╚═════╝░╚═╝░░╚═╝
                1.Cadastrar novo produto
                2.Registrar venda
                3.Exibir estoque
                4.Área do cliente
                5.Sair
                                """);

        System.out.print("\nDigite a Opção Desejada -> ");
        int opc = scanner.nextInt();

        if (opc == 1) {
            cadastro.adicionarProduto();
        } else if (opc == 2) {
            venda.venderProduto();
        } else if (opc == 3) {
            produtos.exibeLista();
        } else if (opc == 4) {
            areaCliente();
        } else if (opc == 5) {

        } else {
            System.err.println("Opção inserida é inválida!!");
            try {
                Thread.sleep(2000); // Pausa por 2 segundos
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            exibir();
        }

    }

    public void areaCliente() {
        Clientes clientes = new Clientes();
        Cadastro cadastro = new Cadastro();

        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println("");

        System.out.println("""
                        ░█████╗░██████╗░███████╗░█████╗░  ██████╗░░█████╗░
                        ██╔══██╗██╔══██╗██╔════╝██╔══██╗  ██╔══██╗██╔══██╗
                        ███████║██████╔╝█████╗░░███████║  ██║░░██║██║░░██║
                        ██╔══██║██╔══██╗██╔══╝░░██╔══██║  ██║░░██║██║░░██║
                        ██║░░██║██║░░██║███████╗██║░░██║  ██████╔╝╚█████╔╝
                        ╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝  ╚═════╝░░╚════╝░

                        ░█████╗░██╗░░░░░██╗███████╗███╗░░██╗████████╗███████╗
                        ██╔══██╗██║░░░░░██║██╔════╝████╗░██║╚══██╔══╝██╔════╝
                        ██║░░╚═╝██║░░░░░██║█████╗░░██╔██╗██║░░░██║░░░█████╗░░
                        ██║░░██╗██║░░░░░██║██╔══╝░░██║╚████║░░░██║░░░██╔══╝░░
                        ╚█████╔╝███████╗██║███████╗██║░╚███║░░░██║░░░███████╗
                        ░╚════╝░╚══════╝╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝
                1.Exibir Lista de Clientes
                2.Adicionar cliente
                3.Voltar ao menu
                                """);
        System.out.print("\nDigite a Opção Desejada -> ");
        int opc = scanner.nextInt();

        if (opc == 1) {
            clientes.exibeClientes();

        } else if (opc == 2) {
            cadastro.cadastrarCliente();
        } else if (opc == 3) {
            exibir();
        } else {
            System.err.println("Opção inserida é inválida!!");
            try {
                Thread.sleep(2000); // Pausa por 2 segundos
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // Simula limpar o console
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            areaCliente();
        }
    }
}