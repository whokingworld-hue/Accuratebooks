const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

const admin = require('firebase-admin');

function initAdmin() {
	if (admin.apps.length) return admin.app();
	const projectId = process.env.FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	let privateKey = process.env.FIREBASE_PRIVATE_KEY;
	if (privateKey && privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');
	admin.initializeApp({ credential: admin.credential.cert({ projectId, clientEmail, privateKey }) });
	return admin.app();
}

async function ensureUser(email, password, displayName, role) {
	try {
		let userRecord;
		try {
			userRecord = await admin.auth().getUserByEmail(email);
		} catch (e) {
			userRecord = await admin.auth().createUser({ email, password, displayName, emailVerified: true });
		}
		await admin.auth().setCustomUserClaims(userRecord.uid, { role });
		await admin.firestore().collection('users').doc(userRecord.uid).set({
			uid: userRecord.uid,
			email: userRecord.email,
			displayName,
			role,
			createdAt: admin.firestore.FieldValue.serverTimestamp()
		}, { merge: true });
		console.log(`Seeded: ${email} (${role})`);
	} catch (e) {
		console.error('Error seeding', email, e.message);
	}
}

(async () => {
	initAdmin();
	await ensureUser('testclient@example.com', 'Test1234', 'Test Client', 'client');
	await ensureUser('testadmin@example.com', 'Test1234', 'Test Admin', 'admin');
	console.log('Seeding complete');
	process.exit(0);
})();

