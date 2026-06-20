# EcoTrack

EcoTrack is a personal carbon footprint tracker built with a React + Vite frontend and an Express + MongoDB backend. It includes secure user authentication, activity logging, carbon impact visualization, and AI-style insights.

## Features

- Signup / login with secure cookie-based authentication
- Activity logging for transportation, energy, food, and shopping emissions
- Carbon footprint calculations with live impact previews
- Dashboard charts and recent activity feed
- AI insights and carbon equivalences
- Backend API with Express, MongoDB, and JWT auth

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: bcryptjs, jsonwebtoken, httpOnly cookies
- Dev tools: ESLint, Vite

## Repository Structure

- `backend/` - Express server, MongoDB models, auth and data routes
- `frontend/` - React app, UI components, styles, login flow
- `.gitignore` - ignore node modules, env files, and build output

## Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Gaurika-05/EcoTrack.git
   cd EcoTrack
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create backend environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/carbon_tracker
   JWT_SECRET=your_strong_secret_here
   CLIENT_URL=http://localhost:5173
   ```

5. Start the backend:
   ```bash
   cd ../backend
   node index.js
   ```

6. Start the frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Open the frontend URL shown by Vite (usually `http://localhost:5173`).

## Notes

- If the frontend port changes, backend CORS accepts local dev origins automatically.
- Do not commit `.env` or secrets to GitHub.

## Optional Improvements

- Add server-side validation and rate limiting
- Add CI / GitHub Actions for linting, testing, and deployment
- Add Docker support for local development and production
- Add accessibility enhancements and Lighthouse performance optimization
