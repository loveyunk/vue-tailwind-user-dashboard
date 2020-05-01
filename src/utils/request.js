import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://my-json-server.typicode.com/loveyunk/vue-tailwind-user-dashboard/'
    : 'http://localhost:3000';

const service = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default service;
