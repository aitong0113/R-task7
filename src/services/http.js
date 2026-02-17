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


// 從 cookie 讀取 token 並設定 Authorization
export function setAdminAuthTokenFromCookie() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (token) {
    httpAdmin.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpAdmin.defaults.headers.common.Authorization;
  }
}

httpAdmin.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    const authScheme = (import.meta.env.VITE_AUTH_SCHEME || 'token').toLowerCase();
    if (token) {
      // 可切換 Bearer 或直接 token
      config.headers.Authorization = authScheme === 'bearer' ? `Bearer ${token}` : token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 提供 PATH 方便組裝路徑
export const API_PATH = import.meta.env.VITE_API_PATH || '';
export const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api';


export function setAdminAuthToken(token) {
  httpAdmin.defaults.headers.common.Authorization = `Bearer ${token}`;
}