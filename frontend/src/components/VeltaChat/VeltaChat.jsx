import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './VeltaChat.module.css'

const SYSTEM_PROMPT = `You are Velta AI — the official assistant for Velta, an AI automation company based in India.

ABOUT VELTA:
Velta builds smart WhatsApp automation systems that convert leads into customers automatically. Built for Indian SMBs (Small and Medium Businesses).

VISION: To make every business in India automated and efficient.
MISSION: Provide affordable, powerful automation tools that help businesses grow smarter, not harder.

MAIN PRODUCT — WHATSFLOW:
WhatsFlow is a smart WhatsApp automation system that helps businesses manage leads, automate replies, and increase conversions — all from WhatsApp.

WhatsFlow Features:
1. Lead Management — Capture all leads automatically, clean organized database, no duplicates
2. AI-Powered Responses — Instant replies 24/7, smart conversation handling, business-specific responses
3. Lead Distribution — Auto assignment to team, round-robin system, no lead clashes
4. Booking & Visit System — Schedule visits, track appointments, manage customer flow
5. Business App — Admin and employee dashboard, lead tracking, status updates
6. Analytics Dashboard — Lead insights, conversion tracking, business performance
7. Bulk Messaging — Send offers and updates, notify customers instantly, one-click broadcast

PRICING PLANS:
1. Starter Plan — Rs.9,999 setup + Rs.1,499/month maintenance
2. Growth Plan — Rs.19,999 setup + Rs.2,999/month maintenance (Most Popular)
3. Enterprise Plan — Rs.29,999 setup + Rs.5,999/month maintenance
4. Custom Plan — Starting Rs.4,999 consultation fee

CONTACT:
- Email: hello@veltalabs.net
- Website: veltalabs.net

RESPONSE GUIDELINES:
- Always be helpful, professional and friendly
- Keep responses concise and clear
- If asked about pricing, give exact numbers
- If asked to book demo, direct to contact page: veltalabs.net/contact
- Always respond in English only, even if user writes in Hindi
- Be conversational and friendly like a helpful Indian assistant
- Never make up information not provided above`

// Single model used for ALL requests (quick questions + typed messages)
const GROQ_MODEL = 'llama-3.1-8b-instant'

// Backend proxy — keeps the Groq API key off the browser
const CHAT_API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/chat`

const quickQuestions = [
  'WhatsFlow kya hai?',
  'Pricing batao',
  'Free demo chahiye',
  'Konsa plan best hai?',
]

export default function VeltaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Velta AI 👋 Ask me anything about Velta, WhatsFlow, our plans or how we can automate your business!",
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

  // Core send — receives the text and current messages snapshot explicitly
  // so quick questions never suffer from stale closure on `input`
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
