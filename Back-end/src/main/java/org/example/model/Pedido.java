package org.example.model;

public class Pedido {
    private Integer id_pedido;
    private Integer t_cliente_id_cliente;
    private Integer t_login_id_vendedor;
    private String dt_pedido;
    private float vl_total;

    public Pedido(){

    }

    public Pedido(Integer id_pedido, Integer t_cliente_id_cliente, Integer t_login_id_vendedor, String dt_pedido, float vl_total){
        this.id_pedido = id_pedido;
        this.t_cliente_id_cliente = t_cliente_id_cliente;
        this.t_login_id_vendedor = t_login_id_vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
    }

    public Pedido(Integer t_cliente_id_cliente, Integer t_login_id_vendedor, String dt_pedido, float vl_total){
        this.t_cliente_id_cliente = t_cliente_id_cliente;
        this.t_login_id_vendedor = t_login_id_vendedor;
        this.dt_pedido = dt_pedido;
        this.vl_total = vl_total;
    }


    public Integer getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(Integer id_pedido) {
        this.id_pedido = id_pedido;
    }

    public Integer getT_login_id_vendedor() {
        return t_login_id_vendedor;
    }

    public void setT_login_id_vendedor(Integer t_login_id_vendedor) {
        this.t_login_id_vendedor = t_login_id_vendedor;
    }

    public Integer getT_cliente_id_cliente() {
        return t_cliente_id_cliente;
    }

    public void setT_cliente_id_cliente(Integer t_cliente_id_cliente) {
        this.t_cliente_id_cliente = t_cliente_id_cliente;
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
}
