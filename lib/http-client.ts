export async function httpRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const res = await fetch(url, mergedOptions);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'HTTP request failed');
  }

  return res.json();
}
