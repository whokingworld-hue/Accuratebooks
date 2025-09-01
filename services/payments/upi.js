const axios = require('axios');

function createUpiDeepLink({ amount, orderId, payeeVpa, payeeName, note }) {
	if (!amount || !payeeVpa) throw new Error('amount and payeeVpa required');
	const params = new URLSearchParams({
		pa: payeeVpa,
		pn: payeeName || 'AccurateBooks',
		am: String(amount),
		cu: 'INR',
		tr: orderId || String(Date.now()),
		n: note || 'Invoice Payment'
	});
	return `upi://pay?${params.toString()}`;
}

async function createCashfreeSubscription({ customerId, planId, amount, returnUrl }) {
	const baseUrl = process.env.CASHFREE_ENV === 'PROD' ? 'https://api.cashfree.com' : 'https://sandbox.cashfree.com';
	const clientId = process.env.CASHFREE_CLIENT_ID;
	const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
	if (!clientId || !clientSecret) throw new Error('Cashfree credentials missing');
	// Minimal example payload; refer to Cashfree docs to expand
	const resp = await axios.post(
		`${baseUrl}/pg/subscription`,
		{ customer_id: customerId, plan_id: planId, amount, return_url: returnUrl },
		{ headers: { 'x-client-id': clientId, 'x-client-secret': clientSecret, 'Content-Type': 'application/json' } }
	);
	return resp.data;
}

module.exports = { createUpiDeepLink, createCashfreeSubscription };

