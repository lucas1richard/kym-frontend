interface TimeoutFetchOptions extends RequestInit {
  timeout?: number;
}

async function timeoutFetch(resource: string, options: TimeoutFetchOptions = { timeout: 8000 }) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}

export default timeoutFetch;
