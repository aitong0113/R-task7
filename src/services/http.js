import axios from 'axios';

// 從環境變數讀取 API 基底位址
const baseURL = import.meta.env.VITE_API_BASE || '';

// 建立 axios 實例
export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 提供 PATH 方便組裝路徑
export const API_PATH = import.meta.env.VITE_API_PATH || '';

// 🔐 每次 request 自動帶 token（Hexschool 版）
http.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      // ❗❗ 這裡「不要 Bearer」
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);