import axios from "axios";

// In production (same Vercel domain), use empty string so requests are relative.
// In local dev, fall back to localhost:8000.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: `${API_BASE}/api/v1`,
    withCredentials: true,
});

export default api;
