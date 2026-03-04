// API service to communicate with the Cloudflare Worker backend.
// In development, point to localhost. In production, point to your deployed worker domain.

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        // credentials: 'include', // No longer needed since auth is removed
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'Request failed');
    }
    return res.json();
}

// ---- Dictionary Data ----

export async function getTierData(tierId) {
    return request(`/api/dictionary/${tierId}`, { method: 'GET' });
}
