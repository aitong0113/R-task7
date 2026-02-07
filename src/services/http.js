import axios from 'axios';

// 從環境變數讀取 API 基底位址
const baseURL = import.meta.env.VITE_API_BASE || '';

// 前台 axios（不帶 token）
export const httpFront = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 後台 axios（帶 token）
export const httpAdmin = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpAdmin.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (token) {
      // Hexschool token：不要加 Bearer
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 提供 PATH 方便組裝路徑
export const API_PATH = import.meta.env.VITE_API_PATH || '';