const axios = require('axios');

async function sendSms(to, message) {
	// Placeholder using Twilio; real implementation would use official SDK
	if (!process.env.TWILIO_ACCOUNT_SID) throw new Error('Twilio not configured');
	return { to, message, sid: 'demo' };
}

async function sendEmail(to, subject, message) {
	if (!process.env.SENDGRID_API_KEY) throw new Error('SendGrid not configured');
	return { to, subject, id: 'demo' };
}

async function sendWhatsapp(to, message) {
	if (!process.env.TWILIO_ACCOUNT_SID) throw new Error('Twilio not configured');
	return { to, message, sid: 'demo' };
}

module.exports = { sendSms, sendEmail, sendWhatsapp };

