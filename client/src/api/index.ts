const BACKEND_URL = 'http://localhost:8081';

const API = {
  REGISTER: `${BACKEND_URL}/api/auth/register`,
  LOGIN: `${BACKEND_URL}/api/auth/login`,
  USERS: `${BACKEND_URL}/api/users`,
  REVIEW: `${BACKEND_URL}/api/review`,
  REVIEWS: `${BACKEND_URL}/api/reviews`,
  MEDIA: `${BACKEND_URL}/media`,
  FILES: `${BACKEND_URL}/file`,
}

export default API;