# Velta Website

A modern, production-grade website for Velta — WhatsApp Business Automation Platform.

## Tech Stack
- **Vite** + **React 18**
- **React Router DOM** v6 for routing
- **CSS Modules** for scoped styling
- **Google Fonts**: Syne (headings) + DM Sans (body)

## Pages
- `/` — Home (Hero, Features, Product Highlight, Why Velta, CTA)
- `/about` — About (Story, Vision, Mission, Values)
- `/product` — WhatsFlow Product (Features, How It Works)
- `/pricing` — Pricing (3 Plans + Custom + FAQ)
- `/demo` — Demo (Video Demos, Book Demo Form)
- `/contact` — Contact (Form, Contact Info)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure
```
velta/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css          (global styles, design tokens)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Navbar.module.css
    │   ├── Footer.jsx
    │   └── Footer.module.css
    └── pages/
        ├── Home.jsx / Home.module.css
        ├── About.jsx / About.module.css
        ├── Product.jsx / Product.module.css
        ├── Pricing.jsx / Pricing.module.css
        ├── Demo.jsx / Demo.module.css
        └── Contact.jsx / Contact.module.css
```

## Design System
All design tokens are in `src/index.css` as CSS variables:
- `--accent`: #00e5ff (cyan)
- `--accent2`: #7c3aed (purple)
- `--accent3`: #06ffa5 (green)
- `--font-head`: Syne
- `--font-body`: DM Sans
