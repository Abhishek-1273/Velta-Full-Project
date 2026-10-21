<div align="center">

# ⚡ VeltaZ — Enterprise Business & AI Automation Suite

**Next-Gen Web Platforms, Intelligent AI Agents, and Scalable Digital Systems**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-veltaai.vercel.app-d4af37?style=for-the-badge&logo=vercel)](https://veltaai.vercel.app)
[![API Status](https://img.shields.io/badge/Backend%20API-Render%20Live-46E3B7?style=for-the-badge&logo=render)](https://velta-full-project.onrender.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-22%20LTS-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)

</div>

---

## 📌 Overview

**VeltaZ** is a high-performance, full-stack digital agency and business automation platform. Built with a modern **React + Vite** frontend and an enterprise-grade **Node.js/Express** backend, VeltaZ enables organizations to automate operations, scale customer acquisition, and deploy custom software with premium aesthetics.

### 🌐 Live Deployments
- **Frontend Web App:** [https://veltaai.vercel.app](https://veltaai.vercel.app)
- **Backend API:** [https://velta-full-project.onrender.com](https://velta-full-project.onrender.com)

---

## 🚀 Core Services & Capabilities

- 💻 **Custom Software & Web Development** — Bespoke web apps, high-converting portals, and fluid UX with mobile-first responsive architecture.
- 🤖 **AI Automation & Intelligent Workflows** — Autonomous workflows, customer lead capture pipelines, and CRM syncing.
- 📈 **SEO, Organic Blogging & GBP Optimization** — Programmatic SEO pipelines, local search authority, and traffic expansion.
- 📊 **Enterprise Dashboards & Telemetry** — Clean operations control centers, domain monitoring, and real-time business health telemetry.
- 💬 **Omnichannel & WhatsApp Automation** — Direct conversational outreach, smart inquiry routing, and automated follow-ups.

---

## 🛠️ Architecture & Tech Stack

```
Velta-Project/
├── frontend/          # React 18 SPA powered by Vite
│   ├── src/
│   │   ├── components/  # Navbar, Footer, UI Modals, Animations
│   │   ├── pages/       # Home, Services, Contact, SEO & Blog, Admin
│   │   ├── context/     # Auth & Theme state management
│   │   └── assets/      # Vector branding, custom illustrations & mockups
│   └── package.json
│
└── backend/           # Node.js + Express REST API
    ├── src/
    │   ├── config/      # MongoDB connection with DNS resolution fixes
    │   ├── controllers/ # Contact enquiry, auth, and business logic
    │   ├── models/      # Mongoose schemas (Contact, User, Logs)
    │   ├── routes/      # REST API route handlers
    │   └── services/    # Email notifications (Resend API)
    └── package.json
```

### Frontend Stack
- **Framework:** React 18 with Vite
- **Routing:** React Router DOM v6
- **Styling:** Modular CSS (`.module.css`) + Glassmorphic dark theme design system
- **Motion & Icons:** Framer Motion animations & React Icons

### Backend Stack
- **Runtime:** Node.js 22 LTS
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** CORS, input validation, JWT authentication with HTTP-only cookies
- **Email Service:** Resend API for instant enquiry notifications

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended, LTS v22 ideal)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone Repository
```bash
git clone https://github.com/Abhishek-1273/Velta-Full-Project.git
cd Velta-Full-Project
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env   # Or create .env manually

# Start development server (Port 5000)
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start Vite dev server (Port 5173)
npm run dev

# Build for production
npm run build
```

---

## 🔐 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
NOTIFY_EMAIL=your_inbox_email@gmail.com
```

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Healthcheck & environment status |
| `POST` | `/api/contact` | Client consultation / project enquiry submission |
| `POST` | `/api/auth/login` | Admin authentication & session token issue |
| `POST` | `/api/auth/register` | Account registration |

---

## 🛡️ Production Deployment

- **Frontend:** Deployed on **Vercel** with automatic preview branches and edge distribution.
- **Backend:** Deployed on **Render** running behind Node 22 with direct MongoDB Atlas replica set clustering.

---

<div align="center">
  <sub>Designed & Developed by <a href="https://veltaai.vercel.app">VeltaZ Digital Systems</a>. All rights reserved.</sub>
</div>
