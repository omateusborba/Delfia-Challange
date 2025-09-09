package org.example.model;

import java.util.ArrayList;
import java.util.List;

public class Pedido {
    private Integer id_pedido;
    private Integer t_cliente_id_cliente;
    private Integer t_login_id_vendedor;
    private String dt_pedido;
    private float vl_total;
    private String cliente;      // Nome do cliente
    private String vendedor;     // Nome do vendedor
    private Integer total_itens; // Quantidade de itens no pedido
    private List<String> itens;  // Lista de itens (descrição simples)

    public Pedido() {
    }

    public Pedido(Integer id_pedido, Integer t_cliente_id_cliente, Integer t_login_id_vendedor, String dt_pedido, float vl_total) {
        this.id_pedido = id_pedido;
        this.t_cliente_id_cliente = t_cliente_id_cliente;
        this.t_login_id_vendedor = t_login_id_vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
    }

    public Pedido(Integer t_cliente_id_cliente, Integer t_login_id_vendedor, String dt_pedido, float vl_total) {
        this.t_cliente_id_cliente = t_cliente_id_cliente;
        this.t_login_id_vendedor = t_login_id_vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
    }

    // Construtor completo
    public Pedido(Integer id_pedido, String cliente, String vendedor, String dt_pedido, float vl_total, Integer total_itens) {
        this.id_pedido = id_pedido;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
        this.total_itens = total_itens;
    }

    // Getters e setters
    public Integer getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(Integer id_pedido) {
        this.id_pedido = id_pedido;
    }

    public Integer getT_cliente_id_cliente() {
        return t_cliente_id_cliente;
    }

    public void setT_cliente_id_cliente(Integer t_cliente_id_cliente) {
        this.t_cliente_id_cliente = t_cliente_id_cliente;
    }

    public Integer getT_login_id_vendedor() {
        return t_login_id_vendedor;
    }

    public void setT_login_id_vendedor(Integer t_login_id_vendedor) {
        this.t_login_id_vendedor = t_login_id_vendedor;
    }

    public String getDt_pedido() {
        return dt_pedido;
    }

    public void setDt_pedido(String dt_pedido) {
        this.dt_pedido = dt_pedido;
    }

    public float getVl_total() {
        return vl_total;
    }

    public void setVl_total(float vl_total) {
        this.vl_total = vl_total;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getVendedor() {
        return vendedor;
    }

    public void setVendedor(String vendedor) {
        this.vendedor = vendedor;
    }

    public Integer getTotal_itens() {
        return total_itens;
    }

    public void setTotal_itens(Integer total_itens) {
        this.total_itens = total_itens;
    }

    public List<String> getItens() {
        return itens;
    }

    public void setItens(List<String> itens) {
        this.itens = itens;
    }
    // Construtor com 5 parâmetros (o que está faltando)
    public Pedido(Integer id_pedido, String cliente, String vendedor, String dt_pedido, float vl_total) {
        this.id_pedido = id_pedido;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
        this.itens = new ArrayList<>(); // Inicializa a lista
        this.total_itens = 0; // Inicializa o total de itens
    }
}
