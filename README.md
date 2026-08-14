# VeltaZ - Enterprise Business Automation Suite

VeltaZ is a modern, high-end, production-grade business automation ecosystem. It comprises a robust Node.js/Express backend API and an interactive React web application. VeltaZ empowers businesses through three core platforms:
- **WhatsFlow** — Intelligent WhatsApp Business & Conversation Automation.
- **Docket14** — Admin, Billing, and Operations Pipeline Automation.
- **KinProperty** — Real Estate Booking and Asset Management Systems.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Vite + React 18
- **Routing:** React Router DOM v6 (Data Loaders & Actions)
- **Styling:** Vanilla CSS + CSS Modules (Scoped Styles)
- **State Management:** React Context API (Authentication & Theme)
- **Icons:** React Icons (`fa`, `io`, etc.)
- **Animations:** CSS Keyframe Animations & Transitions

### Backend
- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose) with auto-detecting **In-Memory MongoDB fallback**
- **Authentication:** JSON Web Tokens (JWT) with HTTP-only cookies
- **Email Dispatch:** Resend API Integration

---

## ✨ Features

- **Cinematic Preloader:** Immediate, flash-free theme loader inside `index.html` executing scale-blur entrance, heartbeat pulse breathing, and curtain roll-up exits.
- **Root-level Portal Auth Modal:** Protected sections (like product catalogs and detail pages) render in the background with a `backdrop-filter: blur(20px)` overlay. It prompts users to login/signup using React Portals to prevent stacking context or z-index collisions with the fixed navbar.
- **Scroll Lock:** Page body scrolling is automatically disabled when the authentication modal overlay is active.
- **Rebranded Assets:** Brand-aligned logo suite (Gold, Black, and White variations) and system copy reflecting **VeltaZ** branding.
- **Clean API Architectures:** Completely stripped n8n webhook files and dependencies, storing all submissions cleanly inside MongoDB.

---

## 🚀 Getting Started

### 1. Run the Backend
Navigate to the `/backend` directory:
```bash
cd backend

# Install dependencies
npm install

# Run backend development server (Port 5000)
npm run dev
```

### 2. Run the Frontend
Navigate to the `/frontend` directory:
```bash
cd frontend

# Install dependencies
npm install

# Run frontend development server (Port 5173)
npm run dev

# Build for production
npm run build
```

---

## 🔑 Environment Configuration

Ensure both environments have their respective `.env` files created.

#### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_token
RESEND_API_KEY=your_resend_api_key
NOTIFY_EMAIL=admin_notification_target_email
NODE_ENV=production
```

#### Frontend (`/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```
