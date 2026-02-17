import { API_PATH, API_PREFIX, httpAdmin, httpFront } from '@/services/http';

// Products（前台）
export const getProducts = async (page = 1) => {
  const r = await httpFront.get(`${API_PREFIX}/${API_PATH}/products`, { params: { page } });
  return r.data;
};

export const getProduct = async (id) => {
  const r = await httpFront.get(`${API_PREFIX}/${API_PATH}/product/${id}`);
  return r.data;
};

// Cart
export const addToCart = async (productId, qty = 1) => {
  const r = await httpFront.post(`${API_PREFIX}/${API_PATH}/cart`, {
    data: { product_id: productId, qty },
  });
  return r.data;
};

export const getCart = async () => {
  const r = await httpFront.get(`${API_PREFIX}/${API_PATH}/cart`);
  return r.data;
};

export const updateCartItem = async (cartId, productId, qty) => {
  const r = await httpFront.put(`${API_PREFIX}/${API_PATH}/cart/${cartId}`, {
    data: { product_id: productId, qty },
  });
  return r.data;
};

export const removeCartItem = async (cartId) => {
  const r = await httpFront.delete(`${API_PREFIX}/${API_PATH}/cart/${cartId}`);
  return r.data;
};

export const clearCart = async () => {
  const r = await httpFront.delete(`${API_PREFIX}/${API_PATH}/carts`);
  return r.data;
};

// Order
export const submitOrder = async (payload) => {
  const r = await httpFront.post(`${API_PREFIX}/${API_PATH}/order`, { data: payload });
  return r.data;
};

// 後台（Admin）相關 API
/**
 * 取得後台產品清單（支援分頁）
 * 用途：依指定頁碼向後端取得該頁產品資料
 * 參數：page（Number，預設 1）；不傳時仍抓第 1 頁
 * 回傳：物件 { products, pagination }，pagination 內含 total_pages 等資訊
 */
export async function getAdminProducts(page = 1) {
  const r = await httpAdmin.get(`${API_PREFIX}/${API_PATH}/admin/products`, {
    params: { page },
  });
  return r.data; // { products, pagination }
}

export const deleteAdminProduct = async (id) => {
  const r = await httpAdmin.delete(`${API_PREFIX}/${API_PATH}/admin/product/${id}`);
  return r.data;
};


export const createAdminProduct = async (payload) => {
  const r = await httpAdmin.post(
    `${API_PREFIX}/${API_PATH}/admin/product`,
    { data: payload }
  );
  return r.data;
};


export const updateAdminProduct = async (id, payload) => {
  const r = await httpAdmin.put(`${API_PREFIX}/${API_PATH}/admin/product/${id}`, { data: payload });
  return r.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file-to-upload', file);
  const r = await httpAdmin.post(`${API_PREFIX}/${API_PATH}/admin/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return r.data;
}