import axios from 'axios';

const client = axios.create({
  baseURL: 'http://121.170.91.125:4000',
});

export default client;
