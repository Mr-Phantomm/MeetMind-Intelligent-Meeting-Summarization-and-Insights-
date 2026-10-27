const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiError extends Error {
  constructor(message, code = 'API_ERROR', status = 500, details = []) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Universal JSON API request helper.
 * Enforces canonical success/error envelope unpacking.
 */
export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkError) {
    throw new ApiError(
      'Unable to connect to backend service. Please ensure the server is running.',
      'NETWORK_ERROR',
      0,
      [{ message: networkError.message }]
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch (_jsonErr) {
    if (!response.ok) {
      throw new ApiError(
        `Server returned status ${response.status}`,
        'SERVER_ERROR',
        response.status
      );
    }
    return null;
  }

  if (!response.ok || payload.success === false) {
    const errorInfo = payload.error || {};
    throw new ApiError(
      errorInfo.message || 'An unexpected API error occurred',
      errorInfo.code || 'REQUEST_FAILED',
      response.status,
      errorInfo.details || []
    );
  }

  return {
    data: payload.data,
    meta: payload.meta || {},
  };
}
