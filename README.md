# binfinite

A simple full-stack application with a Java 8 + Spring Boot backend (with Swagger) and a React frontend. Run locally or deploy on Render.

---

## Prerequisites

* Java JDK 8
* Maven 3.6+
* Node.js 14+ and npm

---

## Project Structure

```
binfinite/
├── Dockerfile
├── backend/     # Spring Boot project
└── frontend/    # React app
```

---

## Run Locally

1. **Backend**

   ```bash
   cd backend
   ./mvnw spring-boot:run     # Windows: mvnw.cmd spring-boot:run
   ```

   Opens at [http://localhost:8081](http://localhost:8081) (default port)

2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

   Opens at [http://localhost:3000](http://localhost:3000) (proxied to backend)

---

## Build for Production

* **Backend**

  ```bash
  cd backend
  ./mvnw clean package
  java -jar target/*.jar
  ```
* **Frontend**

  ```bash
  cd frontend
  npm run build
  ```

---

## Deploy on Render

1. Push your repo to GitHub/GitLab.
2. In Render dashboard, create a new **Web Service** (Docker).
3. Point to your `Dockerfile` at repo root.
4. Enable **Auto-Deploy** on your branch (e.g. main).

Render builds and deploys automatically (takes \~2–5 min). No extra config needed for H2 in-memory DB.

**Live URL:** [https://binfinite.onrender.com/](https://binfinite.onrender.com/)

---

## Swagger UI

* **Locally:**

  ```
  http://localhost:8081/swagger-ui/index.html
  ```
* **On Render (Live):**

  ```
  https://binfinite.onrender.com/swagger-ui/index.html
  ```

  https\://<your-service>.onrender.com/swagger-ui/index.html

  ```
  ```

---

## License

MIT License | See [LICENSE](LICENSE.md)
