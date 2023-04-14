import axios from 'axios';

const createAxiosInstance = (useCustomUrl = false) => {
  const instance = axios.create({
    baseURL: useCustomUrl ? 'http://165.227.159.49/' : 'http://165.227.159.49/api',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('bearer_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  return instance;
};

export default createAxiosInstance;
