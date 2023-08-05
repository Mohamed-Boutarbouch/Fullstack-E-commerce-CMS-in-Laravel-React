import axios from 'axios';

const fileClient = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

export default fileClient;
