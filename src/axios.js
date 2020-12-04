import axios from 'axios';

const client = axios.create({
  baseURL: 'https://481de54ecca4.ngrok.io',
});

export default client;
