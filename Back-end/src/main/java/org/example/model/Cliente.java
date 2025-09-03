package org.example.model;

public class Cliente {
    private Integer id_cliente;
    private String nome;
    private String telefone;
    private String instagram;

    public Cliente(){

    }

    // Construtor completo (usado ao listar do banco)
    public Cliente(Integer id_cliente, String nome, String telefone, String instagram) {
        this.id_cliente = id_cliente;
        this.nome = nome;
        this.telefone = telefone;
        this.instagram = instagram;
    }

    // Construtor simples (usado ao cadastrar)
    public Cliente(String nome, String telefone, String instagram) {
        this.nome = nome;
        this.telefone = telefone;
        this.instagram = instagram;
    }

    public Integer getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Integer id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    @Override
    public String toString() {
        return String.format("| %2d | %-20s | %-13s | %-15s |",
                id_cliente, nome, telefone, instagram);
    }
}
