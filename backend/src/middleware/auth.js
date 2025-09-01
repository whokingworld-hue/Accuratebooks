const { admin } = require('../config/firebase');

async function authMiddleware(req, res, next) {
	try {
		const authHeader = req.headers.authorization || '';
		const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		if (!admin.apps || admin.apps.length === 0) {
			return res.status(503).json({ error: 'Auth not configured' });
		}
		const decoded = await admin.auth().verifyIdToken(token);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' });
	}
}

module.exports = { authMiddleware };
