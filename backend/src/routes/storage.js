const router = require('express').Router();
const multer = require('multer');
const { admin } = require('../config/firebase');
const { authMiddleware } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
	try {
		if (!req.file) return res.status(400).json({ error: 'file required' });
		const bucket = admin.storage().bucket();
		const dest = `docs/${req.user.uid}/${Date.now()}_${req.file.originalname}`;
		const file = bucket.file(dest);
		await file.save(req.file.buffer, { contentType: req.file.mimetype, resumable: false, public: false });
		const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 3600 * 1000 });
		return res.json({ path: dest, url });
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

module.exports = router;

