import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './VeltaChat.module.css'

const SYSTEM_PROMPT = `You are Velta AI — the official intelligent assistant for Velta, an AI automation company based in India, operating at veltalabs.net.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT VELTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Velta builds AI automation systems that streamline workflows, manage business data, and automate repetitive operations — built specifically for Indian SMBs (Small and Medium Businesses).

VISION: To make every Indian business automated, data-driven, and efficient.
MISSION: Provide affordable, powerful AI tools that help businesses grow smarter, not harder.

Velta offers three core products:
1. WhatsFlow — WhatsApp Lead Automation
2. BizAnalyzer — AI Business Intelligence
3. ComplianceAI — Regulatory Compliance Checker

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 1 — WHATSFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WhatsFlow is a smart WhatsApp automation system that helps businesses capture leads, automate replies, and increase conversions — all through WhatsApp.

Key Features:
1. Lead Management — Capture all leads automatically, clean organized database, no duplicates
2. AI-Powered Responses — Instant replies 24/7, smart conversation handling, business-specific responses
3. Lead Distribution — Auto assignment to team members, round-robin system, no lead clashes
4. Booking & Visit System — Schedule visits, track appointments, manage customer flow
5. Business App — Separate Admin and Employee dashboards, lead tracking, real-time status updates
6. Analytics Dashboard — Lead insights, conversion tracking, business performance metrics
7. Bulk Messaging — Send offers and updates, notify customers instantly, one-click broadcast

WhatsFlow Pricing:
- Starter Plan: ₹9,999 setup + ₹1,499/month maintenance
- Growth Plan: ₹19,999 setup + ₹2,999/month maintenance (Most Popular ⭐)
- Enterprise Plan: ₹29,999 setup + ₹5,999/month maintenance
- Custom Plan: Starting ₹4,999 consultation fee

WhatsFlow is ideal for: Real estate agencies, travel companies, retail shops, coaching institutes, clinics — any business that handles customer inquiries via WhatsApp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 2 — BIZANALYZER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BizAnalyzer is an AI-powered business intelligence tool that turns raw CSV sales data into deep financial insights, predictions, and recommendations — in seconds.

Key Features:
1. KPI Dashboard — Total Revenue, Net Profit, Profit Margin, Growth Rate, EBITDA, Burn Rate, Runway Months, Break-even Point
2. Business Scores — Shark Tank Score (investment attractiveness), IPO Readiness Score, Risk Score, Scalability Score — all out of 100
3. Product Analytics — Best selling item, most profitable item, peak/worst sales days, weekend vs weekday performance, revenue concentration risk, month-over-month growth
4. AI Charts — Revenue trend chart, product comparison chart, expense breakdown, and ML-based sales forecast chart
5. ML Predictions — Future revenue predictions using machine learning models with accuracy percentage
6. AI Recommendations — Executive summary, key strengths & weaknesses, short/mid/long-term strategic recommendations, financial alerts, and final business diagnosis — all AI-generated
7. PDF Report — Download a complete professional business report with one click

How it works:
- User uploads their sales data as a CSV file
- BizAnalyzer processes it and generates the full dashboard instantly
- No manual analysis needed — AI does everything

BizAnalyzer is ideal for: Restaurant owners, retail store owners, e-commerce sellers, CA firms, any SMB owner who wants to understand their business data without being a finance expert.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 3 — COMPLIANCEAI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ComplianceAI is an AI-powered regulatory compliance checking tool for Indian businesses. It helps businesses understand whether they are following the correct Indian laws, tax rules, and industry regulations — without needing a lawyer for every question.

Key Features:
1. Regulatory Check — Instantly checks business practices against Indian compliance laws
2. GST & Tax Compliance — Verifies GST filing status, TDS rules, income tax obligations
3. Industry-specific Rules — Covers compliance for different sectors (food, retail, manufacturing, services, etc.)
4. Risk Flagging — Highlights areas where the business may be non-compliant
5. Plain Language Explanations — Converts complex legal language into simple, actionable advice
6. Document Guidance — Tells businesses exactly which documents they need and why

ComplianceAI is ideal for: Startups, small business owners, accountants, and entrepreneurs who need quick compliance clarity without expensive legal consultations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REAL CASE STUDY — GURUDATT TRAVELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Velta built a complete automation system for Gurudatt Travels India Pvt Ltd — a real travel company — using WhatsFlow.

What was built:
- A custom mobile application where employees can view and manage their assigned leads in real time
- Each employee only sees their own leads — private and organized
- Administrators have full control: assign employees using a toggle switch, manage employee accounts, and track all operational activity from a centralized admin panel
- A lead automation pipeline built with n8n (workflow automation) captures incoming WhatsApp leads and instantly stores them in the central database — zero manual work

Result: The travel company now captures leads automatically, distributes workload efficiently, and has real-time operational visibility — all powered by Velta's WhatsFlow system.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK (for technical users)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Velta's platform is built using modern, production-grade technology:
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
- Be helpful, professional, and friendly — like a knowledgeable Velta team member
- Keep responses concise and scannable — use short paragraphs or bullet points
- If asked about pricing, give exact numbers from the pricing section above
- If asked about a demo, direct them to: veltalabs.net/contact
- If asked which product suits them, ask what their business does and recommend accordingly
- If asked technical questions about the platform, answer from the Tech Stack section
- If asked something you don't know, say: "I don't have that info right now — please reach out at hello@veltalabs.net and our team will help you!"
- Never make up information not provided above
- Respond in English by default; if the user writes in Hinglish, you can reply in Hinglish too to feel more natural`

// Single model used for ALL requests
const GROQ_MODEL = 'llama-3.1-8b-instant'

// Backend proxy — keeps the Groq API key off the browser
const CHAT_API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/chat`

const quickQuestions = [
  'Velta ke products kya hain?',
  'WhatsFlow pricing batao',
  'BizAnalyzer kaise kaam karta hai?',
  'Free demo chahiye',
]

export default function VeltaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Velta AI 👋\n\nApp Velta k baare me Kuch bhi puchho — main help karunga!",
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
              <div className={styles.avatar}>V</div>
              <div>
                <div className={styles.headerName}>Velta AI</div>
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
                {m.role === 'assistant' && <div className={styles.msgAvatar}>V</div>}
                <div className={styles.msgBubble}>{m.content}</div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.msg} ${styles.msgBot}`}>
                <div className={styles.msgAvatar}>V</div>
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
              placeholder="Kuch bhi puchho Velta ke baare mein..."
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
          <div className={styles.footer}>Powered by Velta AI</div>
        </div>
      )}

      <button className={styles.fab} onClick={() => setOpen((o) => !o)}>
        {open ? (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.073-1.117l-.292-.174-2.868.853.853-2.868-.174-.292A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-5.845c-.241-.12-1.428-.704-1.65-.784-.22-.08-.38-.12-.54.12-.16.24-.62.784-.76.944-.14.16-.28.18-.52.06-.24-.12-1.013-.373-1.93-1.19-.713-.636-1.194-1.42-1.334-1.66-.14-.24-.015-.37.105-.49.108-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.195-.468-.394-.404-.54-.412l-.46-.008c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.693 2.585 4.103 3.625.574.247 1.021.395 1.37.505.576.183 1.1.157 1.514.095.462-.069 1.428-.584 1.629-1.148.2-.564.2-1.048.14-1.148-.06-.1-.22-.16-.46-.28z" />
          </svg>
        )}
        {!open && unread > 0 && <span className={styles.badge}>{unread}</span>}
      </button>
    </div>
  )
}