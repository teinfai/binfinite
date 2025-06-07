# 1) Build the React app
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# 2) Build the Spring Boot JAR (with React baked into static/)
FROM maven:3.8.5-openjdk-8 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:go-offline
COPY backend ./
COPY --from=frontend-builder /app/frontend/build src/main/resources/static
RUN mvn clean package spring-boot:repackage -DskipTests

# 3) Slim runtime image
FROM eclipse-temurin:8-jre-alpine
WORKDIR /app
EXPOSE 8081
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Let the shell pick up Render’s $PORT (with fallback to 8081)
ENTRYPOINT ["sh", "-c"]
CMD ["java -Dserver.port=${PORT:-8081} -jar /app/app.jar"]
