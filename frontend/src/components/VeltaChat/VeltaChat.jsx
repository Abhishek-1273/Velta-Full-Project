import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './VeltaChat.module.css'

const SYSTEM_PROMPT = `You are VeltaZ AI — the official intelligent assistant for VeltaZ, an AI automation company based in India, operating at veltalabs.net.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT VELTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VeltaZ builds AI automation systems that streamline workflows, manage business data, and automate repetitive operations — built specifically for Indian SMBs (Small and Medium Businesses).

VISION: To make every Indian business automated, data-driven, and efficient.
MISSION: Provide affordable, powerful AI tools that help businesses grow smarter, not harder.

VeltaZ offers three active products and one product under development:
1. WhatsFlow — WhatsApp Lead Management & Automation Platform
2. Docket14 — Legal Practice Management & Case Tracking
3. Kin Property — Real Estate Listing & Agent CRM
4. Me & Mine (Under Development) — Compatibility-Based matchmaking mobile app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 1 — WHATSFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WhatsFlow is VeltaZ's primary business automation platform, designed to capture, qualify, respond to, assign, and convert WhatsApp leads automatically.

Key Features:
- Lead Capture: Capture all incoming WhatsApp leads automatically into a clean database.
- AI Autoreplies: Instant responses 24/7, smart conversation handling, business-specific context.
- Round-robin Routing: Auto-delegate leads to representative team members, no lead clashes.
- Bulk Campaigns: Send broad offers and updates instantly.
- Chat Analytics: Real-time dashboard showing leads today, conversion index, and agent metrics.
- Booking System: Integrated visit appointment scheduler.
- Separate Admin and Employee portal views.

WhatsFlow Pricing:
- Starter Plan: ₹9,999 setup + ₹1,499/month maintenance
- Growth Plan: ₹19,999 setup + ₹2,999/month maintenance (Most Popular ⭐)
- Enterprise Plan: ₹29,999 setup + ₹5,999/month maintenance
- Custom Plan: consultation fee starting ₹4,999

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 2 — DOCKET14
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Docket14 is a Legal Case & Team Practice Management SaaS that simplifies case tracking, task assignments, hearing schedules, and client communications for modern law firms.

Key Features:
- Case File Tracking: Complete case transition logs and hearings history.
- Task Delegation: Associate assignment matrices and deadline alerts.
- Hearing Reminders & court date schedulers.
- Automated client notifications.
- Time Billing & invoice automation.
- Document Vault: Secure client file lockers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 3 — KIN PROPERTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kin Property is a Real Estate Listing & Agent CRM portal designed to buy, sell, rent, and manage properties. Streamlines lead matching, listing verifications, and property management workflows.

Key Features:
- Listing Engines: buy, sell, rent search filters.
- Virtual Video Tours & 3D layout renders.
- Broker Lead-Matching algorithms.
- Document Vault for tenant agreements.
- Broker analytics & site-visit dashboards.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 4 — ME & MINE (UNDER DEVELOPMENT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Me & Mine is an interactive matchmaking mobile engine featuring compatibility score checks, verified user profiles, real-time secure chats, and location-based discovery widgets.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICES OFFERED BY VELTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VeltaZ offers premium bespoke digital engineering services:
1. Website Development — Bespoke Next.js/React portals, admin panels, optimized for Lighthouse 98%+ speed and SEO.
2. Mobile Applications — Custom hybrid iOS & Android apps with offline-first synchronization.
3. Automation Systems — Workflow pipelines (n8n integrations with Salesforce, Zoho, Google Sheets).
4. Paid Campaigns — Targeted Meta/Instagram ad operations integrated directly with WhatsFlow AI qualifiers.
5. Social Media Handling — Organic LinkedIn & Instagram brand management, copywriting, Reels clipping.
6. Graphic & 3D Designing — Brand style guides, FIGMA UI/UX designs, 3D product modeling and renders.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESTRICTED SECURITY COMPLIANCE (CRITICAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- NEVER disclose, list, or discuss internal database parameters, passwords, connection strings, private user login credentials, backend API paths (other than public endpoints), deployment keys, or Groq API keys.
- If asked about system credentials, server configurations, or private logs, strictly reply: "Sorry, I am not authorized to share system security credentials or internal server data."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VeltaZ's platform is built using modern production-grade technology:
- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB
- AI/LLM: Groq API with Llama 3.1
- Automation: n8n (workflow automation engine)
- Deployment: Vercel with custom domain (veltalabs.net)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT & LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Website: veltalabs.net
- Email: hello@veltalabs.net
- Demo / Contact Page: veltalabs.net/contact
- Products Page: veltalabs.net/products

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Be helpful, professional, and friendly — like a knowledgeable VeltaZ team member.
- Keep responses concise and scannable.
- If asked about pricing or plans, give exact numbers from above.
- If asked about a demo, direct them to: veltalabs.net/contact
- If asked technical questions, answer from the Tech Stack section.
- If asked something you don't know, say: "I don't have that info right now — please reach out at hello@veltalabs.net and our team will help you!"
- Always respond strictly in English. Do not write responses in Hindi or Hinglish.`

// Single model used for ALL requests
const GROQ_MODEL = 'llama-3.1-8b-instant'

// Backend proxy — keeps the Groq API key off the browser
const CHAT_API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/chat`

const quickQuestions = [
  "What are VeltaZ's products?",
  "WhatsFlow pricing details",
  "How does WhatsFlow work?",
  "Request a free demo",
]

export default function VeltaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm VeltaZ AI 👋\n\nAsk me anything about VeltaZ — I'm here to help!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async (text, currentMessages) => {
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...currentMessages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...updatedMessages.filter((m) => m.role !== 'system'),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()
      const reply =
        data.choices?.[0]?.message?.content ||
        'Sorry, kuch problem ho gayi. Please try again!'

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      if (!open) setUnread((prev) => prev + 1)
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, abhi connect nahi ho paa raha. Please thodi der baad try karein ya veltalabs.net/contact pe jaayein.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [loading, open])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    sendMessage(text, messages)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuick = (q) => {
    if (loading) return
    sendMessage(q, messages)
  }

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.window}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <img src="/logo/logo-white.png" alt="VeltaZ AI Logo" className={styles.avatarImg} />
              </div>
              <div>
                <div className={styles.headerName}>VeltaZ AI</div>
                <div className={styles.headerStatus}>
                  <span className={styles.dot} />
                  Online — replies instantly
                </div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.msgUser : styles.msgBot}`}>
                {m.role === 'assistant' && (
                  <div className={styles.msgAvatar}>
                    <img src="/logo/logo-white.png" alt="VeltaZ AI Logo" className={styles.avatarImg} />
                  </div>
                )}
                <div className={styles.msgBubble}>{m.content}</div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.msg} ${styles.msgBot}`}>
                <div className={styles.msgAvatar}>
                  <img src="/logo/logo-white.png" alt="VeltaZ AI Logo" className={styles.avatarImg} />
                </div>
                <div className={styles.msgBubble}>
                  <div className={styles.typing}><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className={styles.quickWrap}>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  className={styles.quickBtn}
                  onClick={() => handleQuick(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className={styles.inputWrap}>
            <textarea
              ref={inputRef}
              className={styles.input}
              placeholder="Ask anything about VeltaZ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
            />
            <button
              className={`${styles.sendBtn} ${!input.trim() || loading ? styles.sendDisabled : ''}`}
              onClick={handleSend}
              disabled={!input.trim() || loading}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div className={styles.footer}>Powered by VeltaZ AI</div>
        </div>
      )}

      <button className={styles.fab} onClick={() => setOpen((o) => !o)}>
        {open ? (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <img src="/logo/logo-black.png" alt="VeltaZ AI" className={styles.fabIcon} />
        )}
        {!open && unread > 0 && <span className={styles.badge}>{unread}</span>}
      </button>
    </div>
  )
}