# ChatSphere — Real-Time Chat Application

MERN capstone project: private/group rooms, Socket.IO real-time messaging, JWT auth, online status, typing indicator, unread counts, MongoDB persistence, admin actions.

## Prerequisites
- Node.js 18+
- MongoDB local instance or Atlas URI

## Setup
### Backend
```bash
cd backend
cp .env.example .env
# edit MONGO_URI and JWT_SECRET
npm install
npm run dev
```
Backend runs at `http://localhost:5000`.

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173`.

## Demo admin
Register a normal user first. To grant admin, update that user's `role` to `admin` in MongoDB (`users` collection). Admin can delete rooms and remove users.

## Features
- Register/login with bcrypt password hashing
- JWT access token; socket handshake validates token
- Create/join/leave rooms (public/private room membership)
- Direct messages and group room messages
- Persistent message history
- Online/offline presence, typing events
- Unread counts (client-side per room)
- Admin room/user moderation
- MVC backend, validation, centralized error handling
- Responsive UI

## API overview
Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
Rooms: `GET /api/rooms`, `POST /api/rooms`, `POST /api/rooms/:id/join`, `POST /api/rooms/:id/leave`, `GET /api/rooms/:id/messages`
Messages: `POST /api/rooms/:id/messages`
Admin: `DELETE /api/admin/rooms/:id`, `DELETE /api/admin/users/:id`

## Notes
This is an academic/demo application. For production, add rate limiting, email verification, refresh-token rotation, stronger audit logging, moderation policies, and deploy with HTTPS.

## Unique Collaboration Features (added)
- Room polls: create polls with up to 8 choices and vote; a user vote replaces their previous vote.
- Group tasks: create tasks and track To do / In progress / Done states.
- Shared room notes: room members can read and save shared notes.
- Smart chat summary: generates a lightweight local summary from recent messages and recurring keywords. It does not call an external AI API.

The features are available from the room header buttons: Polls, Tasks, Notes, Summary.

## New unique features (UI modules)
- Focus & Availability status selector (Available, Studying, Coding, In a meeting, Do not disturb).
- Icebreaker Generator with random conversation prompts.
- Code Snippet Studio with language selection, preview, and copy-to-clipboard.
These additions are client-side demo modules and do not yet persist status/snippets to MongoDB or send prompts to other room members.
