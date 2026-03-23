import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const createBooking = (data) => API.post('/bookings', data);
export const getBookingById = (id) => API.get(`/bookings/${id}`);
export const getBookingsByUser = (userId) => API.get(`/bookings/user/${userId}`);
export const getAllBookings = () => API.get('/bookings');
export const approveBooking = (id) => API.put(`/bookings/${id}/approve`);
export const rejectBooking = (id, reason) => API.put(`/bookings/${id}/reject`, { reason });
export const cancelBooking = (id) => API.put(`/bookings/${id}/cancel`);
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
