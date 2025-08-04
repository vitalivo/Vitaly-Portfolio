// frontend/src/config/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://vitaly-portfolio-backend-1s6954262-vitalivo-gmailcoms-projects.vercel.app/api'
  : 'https://vitaly-portfolio-backend-1s6954262-vitalivo-gmailcoms-projects.vercel.app/api';

export { API_BASE_URL };