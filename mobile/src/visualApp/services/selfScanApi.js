const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }

  if (typeof window !== 'undefined' && window.location?.hostname) {
    const protocol = window.location.protocol || 'https:';
    return `${protocol}//${window.location.hostname}:3000`;
  }

  return 'http://localhost:3000';
};

const apiBase = getBaseUrl();

const request = async (path, options = {}) => {
  const res = await fetch(`${apiBase}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}`);
  }
  return res.json();
};

export const selfScanApi = {
  createContext: () => request('/sale/context', { method: 'POST', body: '{}' }),
  searchProducts: (query, contextId) => request(`/sale/products/search/${encodeURIComponent(query)}/${contextId}`),
  addItem: (payload) => request('/sale/item', { method: 'POST', body: JSON.stringify(payload) }),
  setCustomer: (payload) => request('/sale/customer', { method: 'POST', body: JSON.stringify(payload) }),
  createPayment: (payload) => request('/sale/payment', { method: 'POST', body: JSON.stringify(payload) }),
  getSummary: (contextId) => request(`/sale/summary/${contextId}`),
};
