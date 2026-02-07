import { httpFront, httpAdmin, API_PATH } from './http';

// Products（前台）
export const getProducts = async (page = 1) => {
  const r = await httpFront.get(`/api/${API_PATH}/products`, { params: { page } });
  return r.data;
};

export const getProduct = async (id) => {
  const r = await httpFront.get(`/api/${API_PATH}/product/${id}`);
  return r.data;
};

// Cart
export const addToCart = async (productId, qty = 1) => {
  const r = await httpFront.post(`/api/${API_PATH}/cart`, {
    data: { product_id: productId, qty },
  });
  return r.data;
};

export const getCart = async () => {
  const r = await httpFront.get(`/api/${API_PATH}/cart`);
  return r.data;
};

export const updateCartItem = async (cartId, productId, qty) => {
  const r = await httpFront.put(`/api/${API_PATH}/cart/${cartId}`, {
    data: { product_id: productId, qty },
  });
  return r.data;
};

export const removeCartItem = async (cartId) => {
  const r = await httpFront.delete(`/api/${API_PATH}/cart/${cartId}`);
  return r.data;
};

export const clearCart = async () => {
  const r = await httpFront.delete(`/api/${API_PATH}/carts`);
  return r.data;
};

// Order
export const submitOrder = async (payload) => {
  const r = await httpFront.post(`/api/${API_PATH}/order`, { data: payload });
  return r.data;
};

// ✅ 後台（重點：一定用 http）
export const getAdminProducts = async () => {
  const r = await httpAdmin.get(`/api/${API_PATH}/admin/products`);
  return r.data;
};

export const deleteAdminProduct = async (id) => {
  const r = await httpAdmin.delete(`/api/${API_PATH}/admin/product/${id}`);
  return r.data;
};