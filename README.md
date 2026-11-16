<div align="center">

# ⚡ VeltaZ — Enterprise Digital Systems & Software Studio

**High-Performance Web Platforms, Bespoke Software, and Scalable Business Automations**

[![Official Website](https://img.shields.io/badge/Official%20Site-veltalabs.net-dfa840?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.veltalabs.net)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render%20Live-46E3B7?style=for-the-badge&logo=render)](https://velta-full-project.onrender.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-22%20LTS-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)

</div>

---

## 📌 Executive Overview

**VeltaZ** is an enterprise-grade digital systems engineering suite and client platform. Built with a modular **React + Vite** frontend and a secure **Node.js/Express** microservices backend, VeltaZ delivers high-performance web platforms, cross-platform applications, marketing telemetry, and custom automation workflows engineered for reliability and conversion.

### 🌐 Official Platforms
- **Production Web App:** [https://www.veltalabs.net](https://www.veltalabs.net)
- **Production API Gateway:** [https://velta-full-project.onrender.com](https://velta-full-project.onrender.com)

---

## 🚀 Core Systems & Engineering Capabilities

- 💻 **Custom Software & Web Engineering** — Bespoke high-speed web platforms, micro-interactions, responsive physics springs, and Core Web Vitals optimization (LCP < 1.8s).
- 📱 **Cross-Platform Mobile Applications** — Native-feel iOS & Android application development with persistent state sync and reactive backends.
- ⚙️ **Business Automation Systems** — End-to-end webhook integrations, WhatsApp lead capture pipelines, and multi-tier CRM synchronization.
- 📈 **Technical SEO & Growth Architecture** — Dynamic canonical management, OpenGraph protocols, XML sitemap pipelines, and Google Schema.org structured data.
- 🛡️ **Enterprise Security & Compliance** — Full-featured privacy protocols, client intellectual property isolation, and encrypted form telemetry.

---

## 🛠️ Architecture & Project Hierarchy

```
Velta-Project/
├── frontend/                     # High-Speed React 18 SPA powered by Vite
│   ├── public/                   # Static assets, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── api/                  # Centralized Axios client & network interceptors
│   │   ├── components/           # Reusable UI modules (PendulumHero, Navbar, Footer, VeltaChat)
│   │   ├── context/              # Dark/Light theme state hydration
│   │   ├── layouts/              # App.jsx: Dynamic Canonical & SEO Metadata Orchestrator
│   │   ├── pages/                # Isolated route modules (Home, Services, CaseStudies, etc.)
│   │   ├── router/               # React Router DOM v6 with code-splitting & Suspense
│   │   └── main.jsx              # React 18 root mounting
│   ├── dockerfile                # Multi-stage production container build (Alpine)
│   ├── nginx.conf                # Gzip compression & security-hardened reverse proxy
│   └── vite.config.js            # Build optimization, code chunks & asset pipelines
│
└── backend/                      # Production REST API Gateway
    ├── src/
    │   ├── config/               # Database clustering & system configurations
    │   ├── controllers/          # Contact processing, chat, and authentication
    │   ├── middleware/           # CORS, JWT verification, and payload validation
    │   ├── models/               # Mongoose data schemas (Contact, User)
    │   ├── routes/               # REST API routing
    │   ├── services/             # Transactional email & third-party integrations
    │   └── index.js              # Express server initialization
    └── package.json
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended, LTS v22 preferred)
- MongoDB instance or MongoDB Atlas cluster connection string

### 1. Clone the Repository
```bash
git clone https://github.com/Abhishek-1273/Velta-Full-Project.git
cd Velta-Full-Project
```

### 2. Backend Initialization
```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Launch local development server
npm run dev
```

### 3. Frontend Initialization
```bash
cd ../frontend

# Install dependencies
npm install

# Launch Vite development server
npm run dev

# Run production build validation
npm run build
```

---

## 🔐 Environment Configuration Template

### Backend (`/backend/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster_host>/<db_name>?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_token
JWT_EXPIRES_IN=1d
GROQ_API_KEY=your_secure_api_key_placeholder
RESEND_API_KEY=your_secure_resend_key_placeholder
NOTIFY_EMAIL=notifications@yourdomain.com
```

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 Key REST API Specifications

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Microservice health check & uptime status | Public |
| `POST` | `/api/contact` | Client consultation & project enquiry submission | Public |
| `POST` | `/api/auth/login` | Secure administrator session token issuance | Protected |
| `POST` | `/api/chat` | Contextual system query & assistance engine | Public |

---

## 🛡️ Production Deployment Specifications

- **Containerization:** Multi-stage Docker containerization built on `node:22-alpine` and served via `nginx:alpine` with Gzip compression and zero-stale cache policies.
- **Frontend Infrastructure:** Served with client-side SPA routing, dynamic canonical tags, and automated Google Schema.org graphs.
- **Backend Infrastructure:** High-availability Node.js service running on **Render** paired with **MongoDB Atlas** encrypted storage.

---

<div align="center">
  <sub>© 2026 <a href="https://www.veltalabs.net">VeltaZ Digital Systems</a>. All rights reserved.</sub>
</div>
