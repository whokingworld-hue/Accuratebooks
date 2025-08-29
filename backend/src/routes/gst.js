const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');

// GST calculator (basic): amount and gstRate -> split CGST/SGST/IGST
router.post('/calculate', authMiddleware, (req, res) => {
	const { amount = 0, gstRate = 18, interstate = false } = req.body || {};
	const tax = (amount * gstRate) / 100;
	const result = interstate
		? { igst: tax, cgst: 0, sgst: 0, total: amount + tax }
		: { igst: 0, cgst: tax / 2, sgst: tax / 2, total: amount + tax };
	return res.json(result);
});

// Filing assistant placeholders
router.get('/gstr-1/summary', authMiddleware, (req, res) => res.json({ summary: {} }));
router.get('/gstr-3b/summary', authMiddleware, (req, res) => res.json({ summary: {} }));
router.get('/gstr-9/summary', authMiddleware, (req, res) => res.json({ summary: {} }));

module.exports = router;

