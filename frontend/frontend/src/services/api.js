// import axios from 'axios';

// const API_BASE_URL = "https://web-task-ot6h.onrender.com/api" ;
//  //const API_BASE_URL = "http://localhost:10000/api" ;


// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });


// export const getAllItems = async () => {
//   const response = await api.get('/inventory');
//   return response.data.data;
// };

// export const getItem = async (id) => {
//   const response = await api.get(`/inventory${id}`);
//   return response.data.data;
// };

// export const addItem = async (itemData) => {
//   const response = await api.post('/inventory/', itemData);
//   return response.data.data;
// };

// export const updateItem = async (id, itemData) => {
//   const response = await api.put(`/inventory/${id}`, itemData);
//   return response.data.data;
// };

// export const deleteItem = async (id) => {
//   const response = await api.delete(`/inventory/${id}`);
//   return response.data;
// };

// export const updateMultipleItems = async (items) => {
//   const response = await api.put('/inventory/bulk/update', { items });
//   return response.data.data;
// };


// export const getAllCoupons = async () => {
//   const response = await api.get('/coupons/');
//   return response.data.data;
// };

// export const validateCoupon = async (code) => {
//   const response = await api.post('/coupons/validate', { code });
//   return response.data.data;
// };

// export default api;

import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL;

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
  const response = await api.post('/inventory', itemData);
  return response.data.data;
};

export const updateItem = async (id, itemData) => {
  const response = await api.put(`/inventory/${id}`, itemData);
  return response.data.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};

export const updateMultipleItems = async (items) => {
  const response = await api.put('/inventory/bulk/update', { items });
  return response.data.data;
};

export const getAllCoupons = async () => {
  const response = await api.get('/coupons');
  return response.data.data;
};

export const validateCoupon = async (code) => {
  const response = await api.post('/coupons/validate', { code });
  return response.data.data;
};

export default api;
