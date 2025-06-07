# binfinite

A simple full-stack application with a Java 8 + Spring Boot backend (with Swagger) and a React JS frontend. Designed to run locally or be deployed on [Render](https://render.com).

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)

   * [Configuration](#configuration)
   * [Running Locally](#running-locally)
   * [Swagger UI](#swagger-ui)
4. [Frontend Setup](#frontend-setup)

   * [Configuration](#configuration-1)
   * [Running Locally](#running-locally-1)
5. [Building for Production](#building-for-production)
6. [Deploying on Render](#deploying-on-render)

   * [Backend on Render](#backend-on-render)
   * [Frontend on Render](#frontend-on-render)
7. [API Documentation](#api-documentation)
8. [License](#license)

---

## Prerequisites
* **Java JDK 8** (OpenJDK 1.8 or Oracle)
* **Maven 3.6+**
* **Node.js 14+** and **npm**
* **MySQL** (optional—you can use the bundled H2 in-memory DB for testing)

## Backend Setup

### Configuration

1. **Unzip** `backend.zip` (if you haven’t already):

   ```bash
   unzip backend.zip -d backend
   ```
2. **Database**

   * By default the app uses an in-memory H2.
   * To use MySQL, open `backend/src/main/resources/application.properties` and set:

     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/binfinite_db
     spring.datasource.username=YOUR_DB_USER
     spring.datasource.password=YOUR_DB_PASS
     spring.jpa.hibernate.ddl-auto=update
     ```
3. **(Optional) Change server port** by adding:

   ```properties
   server.port=8080
   ```

### Running Locally

```bash
cd backend
# On Unix/macOS
./mvnw clean spring-boot:run

# On Windows
mvnw.cmd clean spring-boot:run
```

The backend will start on `http://localhost:8080`.

### Swagger UI

Once running, explore all REST endpoints at:

```
http://localhost:8080/swagger-ui/index.html
```

---

## Frontend Setup

### Configuration

1. Open `frontend/src/services/api.js`.

2. Ensure the base URL points at your backend:

   ```js
   import axios from 'axios';

   const API = axios.create({
     baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8081/api'
   });

   export default API;
   ```

3. (Optional) Create a `.env` in `/frontend`:

   ```dotenv
   REACT_APP_API_URL=http://localhost:8081/api
   ```

### Running Locally

```bash
cd frontend
npm install
npm start
```

Your React app will be live at `http://localhost:3000`.

---

## Building for Production

### Backend

```bash
cd backend
./mvnw clean package
# Then:
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
# → outputs static files into frontend/build/
```


## Deploying on Render

### Backend on Render

1. **New Web Service** → Connect your GitHub repo & branch.
2. **Build Command**

   ```bash
   ./mvnw clean package
   ```
3. **Start Command**

   ```bash
   java -jar target/demo-0.0.1-SNAPSHOT.jar
   ```
4. **Environment**

   * `SPRING_DATASOURCE_URL`
   * `SPRING_DATASOURCE_USERNAME`
   * `SPRING_DATASOURCE_PASSWORD`
   * (optional) `PORT` (default 8080)
5. **Instance**: choose `Free` or `Standard` plan.

### Frontend on Render

1. **New Static Site** → Connect same repo.
2. **Root Directory**: `frontend`
3. **Build Command**

   ```bash
   npm install && npm run build
   ```
4. **Publish Directory**: `frontend/build`
5. **Env Vars**

   * `REACT_APP_API_URL=https://<your-backend-service>.onrender.com/api`

---

## API Documentation

Once deployed, Swagger is available at:

```
https://<your-backend-service>.onrender.com/swagger-ui/index.html
```

---

## License

This project is released under the [MIT License](LICENSE.md).
