# DSP — Enigoal Success Toolkit

A full-stack web application designed for discovering and applying to government schemes, grants, loans, equity funding, and startup support programs.

---

## 🏗️ Architecture

- **Frontend (`/client`)**: React + Vite + Tailwind CSS
- **Backend (`/server`)**: Node.js + Express + MongoDB (Mongoose) + JWT Authentication

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env   # Configure your MongoDB URI & JWT secret
npm run dev
```

The server runs by default on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd client
npm install
cp .env.example .env   # Configure API URL if needed
npm run dev
```

The client runs by default on `http://localhost:5173`.

---

## 📦 Project Structure

```
├── client/          # Frontend React application (Vite)
├── server/          # Backend Express & MongoDB API
├── .gitignore       # Git ignore rules for node_modules, .env, dist, etc.
└── README.md        # Project documentation
```
