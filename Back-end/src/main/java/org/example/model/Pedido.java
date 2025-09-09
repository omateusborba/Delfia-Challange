package org.example.model;

import java.util.List;

public class Pedido {
    private Integer id_pedido;
    private Integer t_cliente_id_cliente;
    private Integer t_login_id_vendedor;
    private String dt_pedido;
    private float vl_total;
    private String cliente;
    private String vendedor;
    private Integer total_itens;
    private List<ItemVenda> itens;

    public Pedido() {
    }

    public Pedido(Integer id_pedido, Integer t_cliente_id_cliente, Integer t_login_id_vendedor, String dt_pedido, float vl_total) {
        this.id_pedido = id_pedido;
        this.t_cliente_id_cliente = t_cliente_id_cliente;
        this.t_login_id_vendedor = t_login_id_vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
    }

    // Getters e Setters
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

    public List<ItemVenda> getItens() {
        return itens;
    }

    public void setItens(List<ItemVenda> itens) {
        this.itens = itens;
    }

    // Método auxiliar para compatibilidade com frontend existente
    public String getItensString() {
        if (itens == null || itens.isEmpty()) {
            return "Nenhum item";
        }

        StringBuilder sb = new StringBuilder();
        for (ItemVenda item : itens) {
            sb.append(item.getNomeProduto())
                    .append(" (")
                    .append(item.getQuantidade())
                    .append(" x R$ ")
                    .append(String.format("%.2f", item.getValorUnitario()))
                    .append("), ");
        }

        if (sb.length() > 2) {
            sb.setLength(sb.length() - 2);
        }

        return sb.toString();
    }
}