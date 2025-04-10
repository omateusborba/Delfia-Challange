import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

//Nome instagram ou telefone(alguma forma de contato)
public class Clientes {
    public static Map<String, String> clientes = new HashMap<>();

    static {
        clientes.put("Adailton Costa", "876307-8729");
        clientes.put("Ana Silva", "88997654321");
        clientes.put("Pedro Oliveira", "88998765432");
        clientes.put("Carla Souza", "88996543210");
        clientes.put("Lucas Pereira", "88995432109");
        clientes.put("Mariana Costa", "88994321098");
    }

    public void exibeClientes() {
        Menu menu = new Menu();
        Scanner scanner = new Scanner(System.in);

        System.out.println("\nLista de clientes atualizada:");
        System.out.println("---------------------------------------------------------");
        int n = 1;
        
        for(String cliente : clientes.keySet()){
            String contato = clientes.get(cliente);

            System.out.println(String.format("%d-%s---Contato: %s", n, cliente, contato));
            System.out.println("---------------------------------------------------------");
            n++;
        }

        System.out.print("Deseja voltar ao menu inicial? S/N -> ");
        String opc = scanner.nextLine();
        opc = opc.toUpperCase(); 

        if(opc.equals("S")){
            menu.areaCliente();
        }
    }

    public void adicionaCliente(String nome, String contato){ 
        clientes.put(nome, contato);
    }
}
