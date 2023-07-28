import axiosClient from './axiosClient';

export const fetchCsrfToken = () => axiosClient.get('/csrf-cookie');
