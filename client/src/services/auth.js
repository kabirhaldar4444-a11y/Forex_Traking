import apiClient from './api';

export const loginAdmin = (email, password) => {
  return apiClient.post('/auth/login', { email, password });
};

export const registerAdmin = (email, password, name) => {
  return apiClient.post('/auth/register', { email, password, name });
};

export const createOrder = (orderData) => {
  return apiClient.post('/orders', orderData);
};

export const getAllOrders = () => {
  return apiClient.get('/orders');
};

export const getOrderByTrackingId = (trackingId) => {
  return apiClient.get(`/orders/tracking/${trackingId}`);
};

export const updateOrder = (id, orderData) => {
  return apiClient.put(`/orders/${id}`, orderData);
};

export const deleteOrder = (id) => {
  return apiClient.delete(`/orders/${id}`);
};

export const getStats = () => {
  return apiClient.get('/orders/stats');
};
