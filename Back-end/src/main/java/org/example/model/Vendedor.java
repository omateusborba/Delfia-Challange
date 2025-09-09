package org.example.model;

public class Vendedor {
    public Integer id_vendedor;
    public String nm_usuario;
    public String tx_email;
    private String tx_senha;
    public boolean is_gerente;

    public Vendedor() {
    }

    public Vendedor(Integer id_vendedor, String nm_usuario, String tx_senha, boolean is_gerente) {
        this.id_vendedor = id_vendedor;
        this.nm_usuario = nm_usuario;
        this.tx_senha = tx_senha;
        this.is_gerente = is_gerente;
    }

    public Vendedor(String nm_usuario, String tx_senha, boolean is_gerente) {
        this.nm_usuario = nm_usuario;
        this.tx_senha = tx_senha;
        this.is_gerente = is_gerente;
    }

    public Integer getId_vendedor() {
        return id_vendedor;
    }

    public void setId_vendedor(Integer id_vendedor) {
        this.id_vendedor = id_vendedor;
    }

    public String getNm_usuario() {
        return nm_usuario;
    }

    public void setNm_usuario(String nm_usuario) {
        this.nm_usuario = nm_usuario;
    }

    public String getTx_email() {
        return tx_email;
    }

    public void setTx_email(String tx_email) {
        this.tx_email = tx_email;
    }

    public String getTx_senha() {
        return tx_senha;
    }

    public void setTx_senha(String tx_senha) {
        this.tx_senha = tx_senha;
    }

    public boolean isIs_gerente() {
        return is_gerente;
    }

    public void setIs_gerente(boolean is_gerente) {
        this.is_gerente = is_gerente;
    }
}