const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// CA dashboard: list assigned clients (placeholder)
router.get('/clients', authMiddleware, requireRole(['ca', 'admin']), async (req, res) => {
	return res.json({ clients: [] });
});

module.exports = router;

