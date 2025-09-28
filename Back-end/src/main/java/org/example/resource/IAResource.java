package org.example.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Map;

import org.example.PerguntaService;
import org.example.GeminiChat;
import com.google.gson.Gson;

@Path("/ia")
public class IAResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response responder(@QueryParam("pergunta") String pergunta) {
        try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://db.fmcxxrvrksohyruomhdf.supabase.co:5432/postgres",
                "postgres",
                "FluX3RPFIAP")) {

            // prepara os dados do banco + prompt
            String prompt = PerguntaService.prepararPrompt(conn, pergunta);

            // chama o Gemini
            String resposta = GeminiChat.perguntar(prompt);

            // retorna JSON válido
            String json = new Gson().toJson(new RespostaDTO(resposta));
            return Response.ok(json).build();

        } catch (Exception e) {
            e.printStackTrace();
            String erroJson = new Gson().toJson(new ErroDTO(e.getMessage()));
            return Response.status(500).entity(erroJson).build();
        }
    }

    // DTOs simples
    static class RespostaDTO {
        String resposta;

        RespostaDTO(String resposta) {
            this.resposta = resposta;
        }
    }

    static class ErroDTO {
        String erro;

        ErroDTO(String erro) {
            this.erro = erro;
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response responder(Map<String, String> body) {
        String pergunta = body.get("pergunta");

        try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://db.fmcxxrvrksohyruomhdf.supabase.co:5432/postgres",
                "postgres",
                "FluX3RPFIAP")) {

            // Prepara os dados do banco + prompt
            String prompt = PerguntaService.prepararPrompt(conn, pergunta);

            // Chama o Gemini
            String resposta = GeminiChat.perguntar(prompt);

            // Retorna como JSON
            return Response.ok(Map.of("resposta", resposta)).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500)
                    .entity(Map.of("erro", e.getMessage()))
                    .build();
        }
    }

}
