// Como gerente, quero cadastrar produtos no estoque para controlar as entradas e saídas de mercadorias.

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Cadastro {
    List<String> produtos = new ArrayList<>(Arrays.asList("Empadão de frango", "Torta folhada", "Empadas", "Pão de queijo tradicional", "Panqueca", "Pão de queijo recheado", "Escondidinho de mandioca", "Lasanha", "Pastel de Angu", "Bolinho fit de frango"));

    public List<String> getProdutos() {
        return produtos;
    }

    public void adicionarProduto(String produto) {
        produtos.add(produto);
    }
}