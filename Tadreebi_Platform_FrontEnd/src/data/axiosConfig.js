import axios from 'axios';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL:'https://tadreebi-platform.com',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('bearer_token');
      const csrfToken = localStorage.getItem('csrf_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken;
      }
      
      return config;
    },
    error => Promise.reject(error)
  );
  return instance;
};
export default createAxiosInstance;