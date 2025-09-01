const router = require('express').Router();
const multer = require('multer');
const { parseBankStatementAndAutoPost } = require('../../../services/accounting/autoEntry');
const { authMiddleware } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

// Upload bank statement CSV and auto-post entries
router.post('/import', authMiddleware, upload.single('file'), async (req, res) => {
	try {
		const csvBuffer = req.file?.buffer;
		if (!csvBuffer) return res.status(400).json({ error: 'CSV file is required' });
		const entries = await parseBankStatementAndAutoPost(csvBuffer);
		return res.json({ count: entries.length, entries });
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

// P&L and Balance Sheet demo
router.get('/reports/pnl', authMiddleware, (req, res) => res.json({ revenue: 0, expense: 0, profit: 0 }));
router.get('/reports/balance-sheet', authMiddleware, (req, res) => res.json({ assets: 0, liabilities: 0, equity: 0 }));

module.exports = router;

