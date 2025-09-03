# Estágio de build: usa uma imagem base com o OpenJDK e Maven
FROM maven:3.8.7-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Estágio final: usa uma imagem menor para a aplicação
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Executa a aplicação Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
