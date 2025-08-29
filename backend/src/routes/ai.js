const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const OpenAI = require('openai');

let client = null;
if (process.env.OPENAI_API_KEY) {
	client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

router.post('/tax-advice', authMiddleware, async (req, res) => {
	try {
		const { question } = req.body || {};
		if (!question) return res.status(400).json({ error: 'question required' });
		if (!client) return res.status(503).json({ error: 'AI not configured' });
		const completion = await client.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: 'You are a CA specializing in Indian GST and ITR. Keep replies concise and compliant with Indian tax laws.' },
				{ role: 'user', content: question }
			]
		});
		return res.json({ answer: completion.choices?.[0]?.message?.content || '' });
	} catch (e) { return res.status(400).json({ error: e.message }); }
});

module.exports = router;

