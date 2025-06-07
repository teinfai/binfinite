# 1) Build the React app
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# 2) Build the Spring Boot JAR (with the React build baked into src/main/resources/static)
FROM maven:3.8.5-openjdk-8 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml ./
# download Maven deps without running the full build
RUN mvn dependency:go-offline
COPY backend ./
# copy React build output into Spring Boot static resources
COPY --from=frontend-builder /app/frontend/build src/main/resources/static
RUN mvn clean package -DskipTests

# 3) Run the JAR on a slim JRE
FROM eclipse-temurin:8-jre-alpine
WORKDIR /app
# expose same port your app uses
EXPOSE 8081
# copy the fat-jar from the build stage
COPY --from=backend-builder /app/backend/target/*.jar app.jar
# use the Render‐injected $PORT or fallback to 8081
ENV SERVER_PORT=${PORT:-8081}
CMD ["sh","-c","java -Dserver.port=$SERVER_PORT -jar /app/app.jar"]
