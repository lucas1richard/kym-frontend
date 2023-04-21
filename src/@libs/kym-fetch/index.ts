const kymFetch = {
  headers: {
    'Content-Type': 'application/json',
  },
  domain: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : '',
  setHeaders: (headers = {}) => {
    Object.assign(kymFetch.headers, headers);
  },
  post: (path: string, data = {}, options = {}) => fetch(`${kymFetch.domain}${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: kymFetch.headers,
    ...options,
  }),
  put: (path: string, data = {}, options = {}) => fetch(`${kymFetch.domain}${path}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: kymFetch.headers,
    ...options,
  }),
  delete: (path: string, data = {}, options = {}) => fetch(`${kymFetch.domain}${path}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: kymFetch.headers,
    ...options,
  }),
  get: (path: string, options = {}) => fetch(`${kymFetch.domain}${path}`, {
    method: 'GET',
    headers: kymFetch.headers,
    ...options,
  }),
};

export default kymFetch;
