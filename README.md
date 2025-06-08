# binfinite

A simple full-stack application with:
- **Backend:** Java 8 + Spring Boot (with Swagger)
- **Frontend:** React.js  
  Designed to run locally or be deployed on Render.

---

## Prerequisites

- Java 8 (JDK 8)
- Maven 3.6+
- Node.js 14+ and npm

---

## Project Structure

```
binfinite/
├── Dockerfile
├── backend/      # Spring Boot service 
└── frontend/     # React app
```

## Run Locally

1. **Backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```  
   → API at http://localhost:8081

2. **Frontend**
   ```bash
      cd frontend
      npm install
      npm start
   ```  
   → App at http://localhost:3000 (proxied to backend)

---

## Swagger UI

- **Local:** http://localhost:8081/swagger-ui/index.html
- **Live on Render:** https://binfinite.onrender.com/swagger-ui/index.html

---

## Deploy on Render

1. Push your repo to GitHub/GitLab.
2. In Render, create a new **Web Service**:
    - **Environment:** Docker
    - **Dockerfile Path:** /Dockerfile
    - **Branch:** main
3. Enable **Auto-Deploy**.

**Live URL:** https://binfinite.onrender.com/

---

