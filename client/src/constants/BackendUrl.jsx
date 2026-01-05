export const url = import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : import.meta.env.VITE_BACKEND_URL || "/"