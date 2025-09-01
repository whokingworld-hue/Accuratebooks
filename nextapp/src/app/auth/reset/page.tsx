"use client";
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';

export default function ResetPage() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null); setError(null);
		try { await sendPasswordResetEmail(auth, email); setMessage('Check your email for reset link.'); } catch (e) { setError((e as Error).message); }
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md bg-white rounded-lg shadow p-6">
				<h1 className="text-xl font-semibold mb-4">Reset password</h1>
				{message && <div className="text-green-600 text-sm mb-2">{message}</div>}
				{error && <div className="text-red-600 text-sm mb-2">{error}</div>}
				<form onSubmit={onSubmit} className="space-y-3">
					<input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
					<button className="w-full bg-indigo-600 text-white rounded py-2">Send reset link</button>
				</form>
				<div className="text-sm text-gray-500 mt-4">
					<Link href="/auth/login" className="underline">Back to login</Link>
				</div>
			</div>
		</div>
	);
}

