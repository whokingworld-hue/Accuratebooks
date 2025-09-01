"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
	const { user, role, signOut } = useAuth();
	const { t, i18n } = useTranslation();
	return (
		<header className="bg-white border-b">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="font-bold">{t('app.title')}</div>
				<nav className="flex gap-4 text-sm">
					<Link href="/">Home</Link>
					{user && <Link href="/client-dashboard">Client</Link>}
					{(role === 'admin') && <Link href="/admin">Admin</Link>}
					{(role === 'ca') && <Link href="/ca-tools">CA</Link>}
				</nav>
				<div className="flex gap-2 items-center">
					<button className="px-2 py-1 border rounded" onClick={() => i18n.changeLanguage('en')}>EN</button>
					<button className="px-2 py-1 border rounded" onClick={() => i18n.changeLanguage('hi')}>हिं</button>
					{user ? (
						<button className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => signOut()}>Sign out</button>
					) : (
						<Link className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded" href="/auth/login">Login</Link>
					)}
				</div>
			</div>
		</header>
	);
}

