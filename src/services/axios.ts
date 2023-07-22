import axios from 'axios'
import router from '@/router'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceColls = axios.create({
  baseURL: 'https://api2.onlinepbx.ru/pbx15325.onpbx.ru/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const axiosInstanceOrder = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    config.headers = {
      'Authorization': `Bearer ` + token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstanceColls.interceptors.request.use(
  config => {
    const key = localStorage.getItem('key')
    const key_id = localStorage.getItem('key_id')
    config.headers = {
      'x-pbx-authentication': `${key_id}:${key}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstanceOrder.interceptors.request.use(
  config => {
    const orderToken = localStorage.getItem('orderToken')
    config.headers = {
      'Authorization': `Bearer ` + orderToken
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.request.status === 400) {
    router.push('/400');
  } else if (error.request.status === 401) {
    router.push('/login');
  } else if (error.request.status === 403) {
    router.push('/403');
  } else if (error.request.status === 404) {
    router.push('/404');
  } else if (error.request.status === 500) {
    router.push('/500')
  } else return Promise.reject(error);
})

axiosInstance.interceptors.request.use((response) => {
  return response;
}, (error) => {
  if (error.request.status === 401) {
    router.push('/401');
  } else if (error.request.status === 404) {
    router.push('/404');
  } else if (error.request.status === 500) {
    router.push('/500')
  } else return Promise.reject(error);
})
