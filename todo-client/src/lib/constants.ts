const baseUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3000";

console.log(import.meta.env.VITE_API_URL)
export { baseUrl };
