export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || "localhost";
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 8000;
export const BASE_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
