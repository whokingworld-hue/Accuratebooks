const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');

// Auto-suggest ITR form based on simple inputs
router.post('/suggest', authMiddleware, (req, res) => {
	const { incomeSources = [], hasBusiness = false, turnover = 0 } = req.body || {};
	let form = 'ITR-1';
	if (hasBusiness || turnover > 0) form = 'ITR-3';
	if (incomeSources.includes('capital_gains')) form = 'ITR-2';
	return res.json({ form });
});

module.exports = router;

