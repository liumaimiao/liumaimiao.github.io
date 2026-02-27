// API service to communicate with the Cloudflare Worker backend.
// In development, point to localhost. In production, point to your deployed worker domain.

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include', // Send cookies for session auth
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'Request failed');
    }
    return res.json();
}

// ---- Auth ----
export async function sendMagicLink(email) {
    return request('/api/auth/email/send', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

export async function verifyMagicLink(token) {
    return request(`/api/auth/email/verify?token=${token}`, { method: 'GET' });
}


export async function getMe() {
    return request('/api/user/me', { method: 'GET' });
}

export async function logout() {
    return request('/api/auth/logout', { method: 'POST' });
}

// ---- Payments ----
export async function checkoutAlipay(tierId) {
    return request('/api/payments/alipay/checkout', {
        method: 'POST',
        body: JSON.stringify({ tier_id: tierId }),
    });
}

