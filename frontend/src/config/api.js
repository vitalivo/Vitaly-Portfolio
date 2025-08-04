// frontend/src/config/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vitaly-portfolio-frontend-v2.vercel.app/api'
  : 'http://localhost:8000/api';

export { API_BASE_URL };