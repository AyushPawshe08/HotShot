import axios from 'axios';

// Use environment variable in production, fallback to local backend on port 8000
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Shorten a URL
 * @param {Object} payload - { original_url, custom_alias, expiry_hours }
 * @returns {Promise<{ short_url, qr_code_path, created_at, expired_at }>}
 */
export const shortenUrl = async (payload) => {
  const response = await api.post('/url', payload);
  return response.data;
};

/**
 * Fetch latest stats (clicks) for a shortcode
 * @param {string} shortcode
 */
export const getUrlStats = async (shortcode) => {
  const response = await api.get(`/url/stats/${shortcode}`);
  return response.data;
};

export default api;
