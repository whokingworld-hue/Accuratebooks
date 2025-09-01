const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { sendSms, sendEmail, sendWhatsapp } = require('../../../services/notifications/notifier');

// Send test notifications
router.post('/send', authMiddleware, async (req, res) => {
	const { type, to, subject, message } = req.body || {};
	try {
		if (type === 'sms') await sendSms(to, message);
		else if (type === 'email') await sendEmail(to, subject || 'AccurateBooks', message);
		else if (type === 'whatsapp') await sendWhatsapp(to, message);
		else return res.status(400).json({ error: 'Invalid type' });
		return res.json({ ok: true });
	} catch (e) { return res.status(400).json({ error: e.message }); }
});

module.exports = router;

// Cron-like endpoint to send due date reminders (to be scheduled externally)
router.post('/due-cron', async (req, res) => {
	// In production, compute upcoming GST/ITR due dates and notify users from Firestore.
	return res.json({ ok: true, sent: 0 });
});

