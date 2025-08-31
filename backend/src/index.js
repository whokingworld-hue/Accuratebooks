const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const { initializeFirebaseAdmin } = require('./config/firebase');
initializeFirebaseAdmin();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: (origin, callback) => {
		const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
		if (!origin || allowed.includes(origin)) return callback(null, true);
		return callback(new Error('CORS not allowed'));
	},
	credentials: true
}));

// Health
app.get('/', (req, res) => res.json({ status: 'ok', service: 'AccurateBooks backend', docs: '/api/docs', health: '/health' }));
app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/gst', require('./routes/gst'));
app.use('/api/bookkeeping', require('./routes/bookkeeping'));
app.use('/api/itr', require('./routes/itr'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/storage', require('./routes/storage'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/ca', require('./routes/ca'));

// Swagger docs
const swaggerSpec = swaggerJsdoc({
	definition: {
		openapi: '3.0.0',
		info: { title: 'AccurateBooks API', version: '1.0.0' }
	},
	apis: ['./src/routes/*.js']
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Not found handler
app.use((req, res) => {
	return res.status(404).json({ error: 'Not Found', path: req.path });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`AccurateBooks backend running on :${port}`);
});

