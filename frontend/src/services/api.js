import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Servicios de Autenticación
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
}

// Servicios de Productos
export const productService = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
}

// Servicios de Carrito
export const cartService = {
  getCart: () => api.get('/cart'),
  addItem: (data) => api.post('/cart/items', data),
  updateItem: (id, data) => api.put(`/cart/items/${id}`, data),
  removeItem: (id) => api.delete(`/cart/items/${id}`),
  clearCart: () => api.delete('/cart/clear'),
}

// Servicios de Pedidos
export const orderService = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
}

// Servicios de Pagos
export const paymentService = {
  createIntent: (data) => api.post('/payments/create-intent', data),
  webhook: (data) => api.post('/payments/webhook', data),
}

// Servicios de Usuarios
export const userService = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  addAddress: (id, data) => api.post(`/users/${id}/addresses`, data),
  getAddresses: (id) => api.get(`/users/${id}/addresses`),
}

export default api
