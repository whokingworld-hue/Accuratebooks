"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RequireRole({ children, roles }: { children: React.ReactNode, roles?: Array<'admin'|'ca'|'staff'|'client'> }) {
	const { user, role, loading } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (loading) return;
		if (!user) {
			router.replace('/auth/login');
			return;
		}
		if (roles && role && !roles.includes(role)) {
			router.replace('/');
		}
	}, [user, role, loading, router, roles]);
	if (loading) return <div className="p-6">Loading...</div>;
	return <>{children}</>;
}

