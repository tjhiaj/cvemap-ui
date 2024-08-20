const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://cve.projectdiscovery.io/api/v1';
const API_KEY = process.env.REACT_APP_CVEMAP_API_KEY;

if (!API_KEY) {
  console.error('API key is missing. Make sure it is set correctly in your environment variables.');
  process.exit(1);
}

console.log('API Key:', API_KEY);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-PDCP-Key': API_KEY,
  },
});

apiClient.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

apiClient.get('/cves', { params: { limit: 1 } })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error fetching CVEs:', error.response ? error.response.data : error.message);
  });