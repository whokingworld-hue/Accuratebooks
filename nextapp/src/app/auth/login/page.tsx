"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import type { ConfirmationResult } from 'firebase/auth';

export default function LoginPage() {
	const { t } = useTranslation();
	const router = useRouter();
	const { signInEmail, signInGoogle, startPhoneSignIn, confirmPhoneOtp } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [otp, setOtp] = useState('');
	const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try { await signInEmail(email, password); router.push('/client-dashboard'); } catch (e) { setError((e as Error).message); }
	};

	const onGoogle = async () => { try { await signInGoogle(); router.push('/client-dashboard'); } catch (e) { setError((e as Error).message); } };
	const onSendOtp = async () => { try { const c = await startPhoneSignIn(phone, 'recaptcha-container'); setConfirmation(c); } catch (e) { setError((e as Error).message); } };
	const onVerifyOtp = async () => { try { if (!confirmation) return; await confirmPhoneOtp(confirmation, otp); router.push('/client-dashboard'); } catch (e) { setError((e as Error).message); } };

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md bg-white rounded-lg shadow p-6">
				<h1 className="text-xl font-semibold mb-4">{t('auth.login')}</h1>
				{error && <div className="text-red-600 text-sm mb-2">{error}</div>}
				<form onSubmit={onEmailLogin} className="space-y-3">
					<input className="w-full border rounded px-3 py-2" placeholder={t('auth.email')} value={email} onChange={e => setEmail(e.target.value)} />
					<input className="w-full border rounded px-3 py-2" placeholder={t('auth.password')} type="password" value={password} onChange={e => setPassword(e.target.value)} />
					<button className="w-full bg-indigo-600 text-white rounded py-2">{t('auth.login')}</button>
				</form>
				<button className="w-full border rounded py-2 mt-3" onClick={onGoogle}>{t('auth.google')}</button>
				<div className="mt-4">
					<div id="recaptcha-container" />
					<div className="flex gap-2">
						<input className="flex-1 border rounded px-3 py-2" placeholder={t('auth.phone')} value={phone} onChange={e => setPhone(e.target.value)} />
						<button className="px-3 py-2 border rounded" onClick={onSendOtp}>{t('auth.sendOtp')}</button>
					</div>
					{confirmation && (
						<div className="flex gap-2 mt-2">
							<input className="flex-1 border rounded px-3 py-2" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
							<button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={onVerifyOtp}>{t('auth.verifyOtp')}</button>
						</div>
					)}
				</div>
				<div className="text-sm text-gray-500 mt-4">
					<Link href="/auth/signup" className="underline">Create account</Link>
					<span className="mx-2">·</span>
					<Link href="/auth/reset" className="underline">Forgot password?</Link>
				</div>
			</div>
		</div>
	);
}

