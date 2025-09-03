package org.example.model;

public class Estoque {
    private Integer id_produto;
    private String nome;
    private Integer quantidade;
    private float preco;

    public Estoque(){

    }

    public Estoque(Integer id_produto, String nome, Integer quantidade, float preco) {
        this.id_produto = id_produto;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    public Estoque(String nome, Integer quantidade, float preco) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    // Getters e Setters
    public Integer getId_produto() {
        return id_produto;
    }

    public void setId_produto(Integer id_produto) {
        this.id_produto = id_produto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    @Override
    public String toString() {
        return "ID: " + id_produto +
                ", Produto: " + nome +
                ", Quantidade: " + quantidade +
                ", Preço: R$ " + String.format("%.2f", preco);
    }
}