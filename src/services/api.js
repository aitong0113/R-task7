import { http, API_PATH } from './http';

// Products（前台）
export const getProducts = (page = 1) =>
  http.get(`/api/${API_PATH}/products`, { params: { page } }).then(r => r.data);

export const getProduct = (id) =>
  http.get(`/api/${API_PATH}/product/${id}`).then(r => r.data);

// Cart
export const addToCart = (productId, qty = 1) =>
  http.post(`/api/${API_PATH}/cart`, {
    data: { product_id: productId, qty },
  }).then(r => r.data);

export const getCart = () =>
  http.get(`/api/${API_PATH}/cart`).then(r => r.data);

export const updateCartItem = (cartId, productId, qty) =>
  http.put(`/api/${API_PATH}/cart/${cartId}`, {
    data: { product_id: productId, qty },
  }).then(r => r.data);

export const removeCartItem = (cartId) =>
  http.delete(`/api/${API_PATH}/cart/${cartId}`).then(r => r.data);

export const clearCart = () =>
  http.delete(`/api/${API_PATH}/carts`).then(r => r.data);

// Order
export const submitOrder = (payload) =>
  http.post(`/api/${API_PATH}/order`, { data: payload }).then(r => r.data);

// ✅ 後台（重點：一定用 http）
export const getAdminProducts = () =>
  http.get(`/api/${API_PATH}/admin/products`);

export const deleteAdminProduct = (id) =>
  http.delete(`/api/${API_PATH}/admin/product/${id}`);