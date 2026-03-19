const API_BASE =
  import.meta.env.PROD
    ? "https://prepbox-backend.onrender.com"
    : "";

export default API_BASE;