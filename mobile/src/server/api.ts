import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.0.143:3333/',
});
