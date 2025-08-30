"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db, googleProvider, RecaptchaVerifier } from '@/lib/firebase';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut, createUserWithEmailAndPassword, updateProfile, signInWithPopup, signInWithPhoneNumber } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { apiFetch } from '@/lib/api';

type Role = 'admin' | 'ca' | 'staff' | 'client';

type AuthContextType = {
	user: User | null;
	role: Role | null;
	loading: boolean;
	signInEmail: (email: string, password: string) => Promise<void>;
	signUp: (name: string, email: string, password: string, phone?: string) => Promise<void>;
	signInGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
	getIdToken: () => Promise<string | null>;
	startPhoneSignIn: (phone: string, containerId: string) => Promise<import('firebase/auth').ConfirmationResult>;
	confirmPhoneOtp: (confirmation: import('firebase/auth').ConfirmationResult, code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function ensureUserDoc(user: User) {
	const ref = doc(db, 'users', user.uid);
	const snap = await getDoc(ref);
	if (!snap.exists()) {
		await setDoc(ref, {
			uid: user.uid,
			email: user.email || '',
			phone: user.phoneNumber || '',
			displayName: user.displayName || '',
			role: 'client',
			createdAt: serverTimestamp(),
		});
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState<Role | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (u) => {
			setUser(u);
			if (u) {
				await ensureUserDoc(u);
				try {
					const data = await apiFetch('/api/users/me', {}, async () => (await u.getIdToken()));
					setRole((data.role as Role) || 'client');
				} catch {
					setRole('client');
				}
			} else {
				setRole(null);
			}
			setLoading(false);
		});
		return () => unsub();
	}, []);

	const value = useMemo<AuthContextType>(() => ({
		user,
		role,
		loading,
		signInEmail: async (email, password) => { await signInWithEmailAndPassword(auth, email, password); },
		signUp: async (name, email, password, phone) => {
			const cred = await createUserWithEmailAndPassword(auth, email, password);
			if (name) await updateProfile(cred.user, { displayName: name });
			await ensureUserDoc(cred.user);
		},
		signInGoogle: async () => { await signInWithPopup(auth, googleProvider); },
		signOut: async () => { await fbSignOut(auth); },
		getIdToken: async () => (await auth.currentUser?.getIdToken()) || null,
		startPhoneSignIn: async (phone, containerId) => {
			// Ensure RecaptchaVerifier exists on window
			const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
			return signInWithPhoneNumber(auth, phone, verifier);
		},
		confirmPhoneOtp: async (confirmation, code) => {
			await confirmation.confirm(code);
		},
	}), [user, role, loading]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}

