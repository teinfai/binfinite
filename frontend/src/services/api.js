// src/api.js
import axios from 'axios';

// Always use a relative URL.
// In development, CRA will proxy '/api/*' → 'http://localhost:8081/api/*'
// In production, '/api/*' is served by Spring Boot on the same origin.
const api = axios.create({
    baseURL: '/api/task',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
