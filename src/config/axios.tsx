import axios from 'axios';

export let axios_instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
