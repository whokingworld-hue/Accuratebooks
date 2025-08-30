export async function apiFetch(path: string, opts: RequestInit = {}, getToken?: () => Promise<string | null>) {
	const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
	const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(opts.headers as Record<string, string> || {}) };
	if (getToken) {
		const token = await getToken();
		if (token) headers['Authorization'] = `Bearer ${token}`;
	}
	const res = await fetch(`${base}${path}`, { ...opts, headers, cache: 'no-store' });
	if (!res.ok) throw new Error((await res.json().catch(() => ({ error: res.statusText }))).error || 'Request failed');
	return res.json();
}

