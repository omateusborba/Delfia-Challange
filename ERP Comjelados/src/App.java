public class App {
    public static void main(String[] args) throws Exception {
        Cadastro listaProdutos = new Cadastro(); // Cria um objeto ListaProdutos

        // Cadastra um novo produto
        listaProdutos.adicionarProduto("Chave Fillips");

        // Exibe a lista de produtos atualizada (opcional)
        System.out.println("Lista de produtos atualizada:");
        for (String produto : listaProdutos.getProdutos()) {
            System.out.println("- " + produto);

        }
    }
}