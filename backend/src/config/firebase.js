const admin = require('firebase-admin');

function initializeFirebaseAdmin() {
	if (admin.apps.length) return admin.app();
	const projectId = process.env.FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	let privateKey = process.env.FIREBASE_PRIVATE_KEY;
	if (!projectId || !clientEmail || !privateKey) {
		console.warn('Firebase Admin not initialized: missing credentials. Set FIREBASE_* env vars.');
		return null;
	}
	if (privateKey.includes('\\n')) {
		privateKey = privateKey.replace(/\\n/g, '\n');
	}
	admin.initializeApp({
		credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
		storageBucket: `${projectId}.appspot.com`
	});
	return admin.app();
}

module.exports = { initializeFirebaseAdmin, admin };

