const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { admin } = require('../config/firebase');

// Get current user profile and role (from Firestore)
router.get('/me', authMiddleware, async (req, res) => {
	try {
		const snap = await admin.firestore().collection('users').doc(req.user.uid).get();
		const userDoc = snap.exists ? snap.data() : null;
		return res.json({ user: req.user, role: userDoc?.role || 'client', profile: userDoc || {} });
	} catch (e) { return res.status(400).json({ error: e.message }); }
});

// Admin: list users
router.get('/', authMiddleware, requireRole(['admin']), async (req, res) => {
	const snap = await admin.firestore().collection('users').limit(200).get();
	const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
	return res.json({ users });
});

// Admin: set user role
router.post('/set-role', authMiddleware, requireRole(['admin']), async (req, res) => {
	try {
		const { uid, role } = req.body || {};
		const allowed = ['admin','ca','staff','client'];
		if (!uid || !allowed.includes(role)) return res.status(400).json({ error: 'invalid input' });
		await admin.firestore().collection('users').doc(uid).set({ role }, { merge: true });
		return res.json({ ok: true });
	} catch (e) { return res.status(400).json({ error: e.message }); }
});

module.exports = router;

