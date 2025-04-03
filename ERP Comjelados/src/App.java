import javax.swing.*;
import java.awt.*;
import helper_classes.*;

public class App {

    public static void main(String[] args) throws Exception {

        // Ícone da página
        ImageIcon imagemIcon = new ImageIcon(App.class.getResource("/img/flux-logo-sf.png"));
        Image imagem = imagemIcon.getImage();

        // Cria o frame
        JFrame frame = new JFrame("Flux");
        frame.setIconImage(imagem); // Define o ícone da janela
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(990, 535);

        JPanel panel = new JPanel();
        panel.setBackground(Color.decode("#ffffff"));
        panel.setLayout(null);
        // Adiciona uma Label centralizada
        JLabel element8 = new JLabel("Bem vindo ao Flux");
        element8.setBounds(300, 0, 389, 57);
        element8.setFont(CustomFontLoader.loadFont("./resources/fonts/Lato.ttf", 45));
        element8.setForeground(Color.decode("#000000"));
        panel.add(element8);

        JButton element10 = new JButton("Cadastrar novo produto");
        element10.setBounds(50, 151, 241, 28);
        element10.setBackground(Color.decode("#2e2e2e"));
        element10.setForeground(Color.decode("#D9D9D9"));
        element10.setFont(CustomFontLoader.loadFont("./resources/fonts/Lato.ttf", 14));
        element10.setBorder(new RoundedBorder(6, Color.decode("#979797"), 0));
        element10.setFocusPainted(false);
        OnClickEventHelper.setOnClickColor(element10, Color.decode("#232323"), Color.decode("#2e2e2e"));
        panel.add(element10);

        JButton element11 = new JButton("Registrar venda");
        element11.setBounds(365, 152, 241, 28);
        element11.setBackground(Color.decode("#2e2e2e"));
        element11.setForeground(Color.decode("#D9D9D9"));
        element11.setFont(CustomFontLoader.loadFont("./resources/fonts/Lato.ttf", 14));
        element11.setBorder(new RoundedBorder(4, Color.decode("#979797"), 0));
        element11.setFocusPainted(false);
        OnClickEventHelper.setOnClickColor(element11, Color.decode("#232323"), Color.decode("#2e2e2e"));
        panel.add(element11);

        JButton element12 = new JButton("Cadastrar Clientes");
        element12.setBounds(700, 150, 241, 28);
        element12.setBackground(Color.decode("#2e2e2e"));
        element12.setForeground(Color.decode("#D9D9D9"));
        element12.setFont(CustomFontLoader.loadFont("./resources/fonts/Lato.ttf", 14));
        element12.setBorder(new RoundedBorder(4, Color.decode("#979797"), 0));
        element12.setFocusPainted(false);
        OnClickEventHelper.setOnClickColor(element12, Color.decode("#232323"), Color.decode("#2e2e2e"));
        panel.add(element12);

        JButton element13 = new JButton("Sair");
        element13.setBounds(365, 400, 241, 28);
        element13.setBackground(Color.decode("#2e2e2e"));
        element13.setForeground(Color.decode("#D9D9D9"));
        element13.setFont(CustomFontLoader.loadFont("./resources/fonts/Lato.ttf", 14));
        element13.setBorder(new RoundedBorder(4, Color.decode("#979797"), 0));
        element13.setFocusPainted(false);
        OnClickEventHelper.setOnClickColor(element13, Color.decode("#232323"), Color.decode("#2e2e2e"));
        panel.add(element13);

        frame.add(panel);
        frame.setVisible(true);
    }
}