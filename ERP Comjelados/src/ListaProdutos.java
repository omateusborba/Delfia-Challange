import java.util.HashMap;
import java.util.Map;

public class ListaProdutos {
    public static Map<String, Integer> produtos = new HashMap<>();

    static {
        produtos.put("Empadão de frango 25", 25);
        produtos.put("Torta folhada", 25);
        produtos.put("Empadas", 15);
        produtos.put("Pão de queijo tradicional", 25);
        produtos.put("Panqueca", 25);
        produtos.put("Pão de queijo recheado", 28);
        produtos.put("Escondidinho de mandioca", 22);
        produtos.put("Lasanha", 25);
        produtos.put("Pastel de Angu", 18);
        produtos.put("Bolinho fit de frango", 18);
    }

    public Map<String, Integer> getProdutos(){
        return produtos;
    }

    public void adicionarProduto(String chave, int valor){
        produtos.put(chave, valor);
    }
}