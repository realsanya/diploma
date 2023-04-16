const NODE_BACKEND_URL = 'http://localhost:8081';
const FLASK_BACKEND_URL = 'http://localhost:8000';

const API = {
  REGISTER: `${NODE_BACKEND_URL}/api/auth/register`,
  LOGIN: `${NODE_BACKEND_URL}/api/auth/login`,
  USERS: `${NODE_BACKEND_URL}/api/users`,
  REVIEW: `${NODE_BACKEND_URL}/api/review`,
  REVIEWS: `${NODE_BACKEND_URL}/api/reviews`,
  ARTICLE: `${NODE_BACKEND_URL}/api/article`,
  MEDIA: `${NODE_BACKEND_URL}/media`,
  FILES: `${NODE_BACKEND_URL}/file`,
  ANALYSE: `${FLASK_BACKEND_URL}/analysis`
}

export default API;