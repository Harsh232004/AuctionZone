// src/api/http.ts
export function getAccessToken() {
  return localStorage.getItem('access_token') ?? '';
}

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}
