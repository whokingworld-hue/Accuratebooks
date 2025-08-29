# AccurateBooks

AccurateBooks is a production-ready SaaS for Indian SMEs to manage GST billing, accounting, ITR filing, and CA collaboration.

## Stack
- Frontend: React + TailwindCSS + TypeScript
- Backend: Node.js + Express.js
- Firebase: Firestore, Auth, Storage
- Payments: UPI Deep Links + Cashfree Autopay
- AI: OpenAI API (GST/ITR guidance)

## Structure
```
/frontend
/backend
/services
  /payments
  /accounting
  /notifications
  /storage
/docs
```

## Setup
1. Copy `.env.example` to `.env` in backend and frontend as needed.
2. Install deps with `npm i` in `backend` and `frontend`.
3. Start backend `npm run dev` and frontend `npm run dev`.

## Security
Use environment variables for all credentials. Never commit secrets.

## License
Proprietary © AccurateBooks
