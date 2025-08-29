const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
	return res.json({ user: req.user });
});

// Admin: list users (placeholder - would use Firestore or Admin SDK)
router.get('/', authMiddleware, requireRole(['admin']), async (req, res) => {
	return res.json({ users: [] });
});

module.exports = router;

