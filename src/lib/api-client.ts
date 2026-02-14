import { API_URL, JWT_KEY } from './constants';

function getToken(): string | null {
  return localStorage.getItem(JWT_KEY);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem(JWT_KEY);
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

export async function apiUpload(file: File): Promise<{ id: number; url: string }> {
  const token = getToken();
  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || `Upload failed: ${res.status}`);
  }

  const data = await res.json();
  const uploaded = Array.isArray(data) ? data[0] : data;
  return { id: uploaded.id, url: uploaded.url };
}
