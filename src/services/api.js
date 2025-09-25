import axios from 'axios';
import { showError } from '../utils/toast';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    showError(message);
    return Promise.reject(error);
  }
);
export const contactAPI = {
  submit: async (contactData) => {
    return await api.post('/contact', contactData);
  },

  getAll: async (params = {}) => {
    return await api.get('/contact', { params });
  },

  updateStatus: async (id, status) => {
    return await api.put(`/contact/${id}`, { status });
  }
};

// Cloudinary upload function
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'candle'); // You need to create this preset in Cloudinary
  formData.append('cloud_name', 'dhxqbvevo'); // Replace with your Cloudinary cloud name

  try {
    const response = await axios.post(UPLOAD_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  register: async (name, email, password) => {
    return await api.post('/auth/register', { name, email, password });
  },

  getProfile: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (userData) => {
    return await api.put('/auth/profile', userData);
  }
};

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    return await api.get('/products', { params });
  },
  // /collections/:id

  getById: async (id) => {
    return await api.get(`/products/${id}`);
  },
  getByCollectionId: async (id) => {
    return await api.get(`/products/collections/${id}`);
  },

  create: async (productData) => {
    return await api.post('/products', productData);
  },

  update: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  delete: async (id) => {
    return await api.delete(`/products/${id}`);
  },

  getFeatured: async () => {
    return await api.get('/products/featured/list');
  }
};

// Collections API
export const collectionsAPI = {
  getAll: async () => {
    return await api.get('/collections');
  },

  getById: async (id) => {
    return await api.get(`/collections/${id}`);
  },

  create: async (collectionData) => {
    return await api.post('/collections', collectionData);
  },

  update: async (id, collectionData) => {
    return await api.put(`/collections/${id}`, collectionData);
  },

  delete: async (id) => {
    return await api.delete(`/collections/${id}`);
  }
};

// Cart API
export const cartAPI = {
  get: async () => {
    return await api.get('/cart');
  },

  addItem: async (productId, quantity = 1) => {
    return await api.post('/cart/items', { productId, quantity });
  },

  updateItem: async (productId, quantity) => {
    return await api.put(`/cart/items/${productId}`, { quantity });
  },

  removeItem: async (productId) => {
    return await api.delete(`/cart/items/${productId}`);
  },

  clear: async () => {
    return await api.delete('/cart');
  }
};

// Users API
export const usersAPI = {
  addToWishlist: async (productId) => {
    return await api.post(`/users/wishlist/${productId}`);
  },

  getWishlist: async () => {
    return await api.get('/users/wishlist');
  },

  getAllUsers: async (params = {}) => {
    return await api.get('/users', { params });
  },

  updateUserRole: async (userId, role) => {
    return await api.put(`/users/${userId}/role`, { role });
  },

  deactivateUser: async (userId) => {
    return await api.put(`/users/${userId}/deactivate`);
  }
};