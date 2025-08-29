const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const PDFDocument = require('pdfkit');

// Create invoice (placeholder)
router.post('/', authMiddleware, async (req, res) => {
	const { customer, items, invoiceNumber, date } = req.body || {};
	return res.json({ id: 'inv_demo', customer, items, invoiceNumber, date });
});

// Generate invoice PDF
router.get('/:id/pdf', authMiddleware, async (req, res) => {
	res.setHeader('Content-Type', 'application/pdf');
	const doc = new PDFDocument({ margin: 50 });
	doc.pipe(res);
	doc.fontSize(18).text('AccurateBooks Tax Invoice', { align: 'center' });
	doc.moveDown();
	doc.fontSize(12).text(`Invoice #: ${req.params.id}`);
	doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`);
	doc.moveDown();
	doc.text('Thank you for your business.');
	doc.end();
});

module.exports = router;

