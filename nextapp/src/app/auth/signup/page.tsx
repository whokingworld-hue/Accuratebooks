"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
	const router = useRouter();
	const { signUp } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try { await signUp(name, email, password, phone); router.push('/client-dashboard'); } catch (e) { setError((e as Error).message); }
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md bg-white rounded-lg shadow p-6">
				<h1 className="text-xl font-semibold mb-4">Create account</h1>
				{error && <div className="text-red-600 text-sm mb-2">{error}</div>}
				<form onSubmit={onSubmit} className="space-y-3">
					<input className="w-full border rounded px-3 py-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
					<input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
					<input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
					<input className="w-full border rounded px-3 py-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
					<button className="w-full bg-indigo-600 text-white rounded py-2">Sign up</button>
				</form>
				<div className="text-sm text-gray-500 mt-4">
					Already have an account? <Link href="/auth/login" className="underline">Login</Link>
				</div>
			</div>
		</div>
	);
}

