import axios from 'axios';

const BASE_URL = '/api/v1';
const API_KEY = process.env.REACT_APP_CVEMAP_API_KEY;

// Common axios instance with API key header
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-PDCP-Key': API_KEY,
    },
  });

export const getCves = async (filters) => {
  try {
    console.log("Applying Filters:", filters); // Debugging line
    const response = await apiClient.get('/cves', { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching CVEs", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Check your API key");
    }
    return [];
  }
};

export const getCveDetail = async (cveId) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/cves/${cveId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching CVE detail", error);
    return null;
  }
};
