import axios from "axios";

// Use the deployed backend URL in production, fallback to localhost in dev
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: `${API_BASE}/api/v1`,
    withCredentials: true,
});

export default api;
