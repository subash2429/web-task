import axios from 'axios';

const API_BASE_URL = "https://web-task-ot6h.onrender.com/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const getAllItems = async () => {
  const response = await api.get('/inventory');
  return response.data.data;
};

export const getItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data.data;
};

export const addItem = async (itemData) => {
  const response = await api.post('/', itemData);
  return response.data.data;
};

export const updateItem = async (id, itemData) => {
  const response = await api.put(`/${id}`, itemData);
  return response.data.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const updateMultipleItems = async (items) => {
  const response = await api.put('/bulk/update', { items });
  return response.data.data;
};


export const getAllCoupons = async () => {
  const response = await api.get('/');
  return response.data.data;
};

export const validateCoupon = async (code) => {
  const response = await api.post('/validate', { code });
  return response.data.data;
};

export default api;