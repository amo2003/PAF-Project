import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const getAllResources = () => API.get('/resources');
export const getResourceById = (id) => API.get(`/resources/${id}`);
export const searchResources = (params) => API.get('/resources/search', { params });
export const createResource = (data) => API.post('/resources', data);
export const updateResource = (id, data) => API.put(`/resources/${id}`, data);
export const updateResourceStatus = (id, status) => API.patch(`/resources/${id}/status`, { status });
export const deleteResource = (id) => API.delete(`/resources/${id}`);
