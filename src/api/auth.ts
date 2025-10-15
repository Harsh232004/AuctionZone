// src/api/auth.ts
export type LoginRequest = { email: string; password: string };
export type UserDTO = { id: number; username: string; email: string };

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    tokenType?: string; // "Bearer"
    user?: UserDTO;     // optional if your backend includes it
  } | null;
};

export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      msg = body?.message || msg;
    } catch {
      msg = await res.text().catch(() => msg);
    }
    throw new Error(msg || 'Login failed');
  }
  return res.json();
}

export function saveToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('access_token');
}

export function clearToken() {
  localStorage.removeItem('access_token');
}

// Minimal JWT decode (no crypto verification, just base64url decode)
export function decodeJwt<T = any>(token: string): T | null {
  try {
    const [, payload] = token.split('.');
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJwt<{ exp?: number }>(token);
  if (!decoded?.exp) return true;
  const nowSec = Math.floor(Date.now() / 1000);
  return decoded.exp <= nowSec;
}
