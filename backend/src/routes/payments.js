const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { createUpiDeepLink, createCashfreeSubscription } = require('../../../services/payments/upi');

// Create UPI deep link for invoice payment
router.post('/upi/deeplink', authMiddleware, async (req, res) => {
	const { amount, orderId, payeeVpa, payeeName, note } = req.body || {};
	const link = createUpiDeepLink({ amount, orderId, payeeVpa, payeeName, note });
	return res.json({ link });
});

// Create Cashfree autopay subscription
router.post('/cashfree/subscription', authMiddleware, async (req, res) => {
	try {
		const { customerId, planId, amount, returnUrl } = req.body || {};
		const sub = await createCashfreeSubscription({ customerId, planId, amount, returnUrl });
		return res.json(sub);
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

module.exports = router;

