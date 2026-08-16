import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './VeltaChat.module.css'

// Note: SYSTEM_PROMPT and model selection are secured on the backend

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
          messages: updatedMessages.filter((m) => m.role !== 'system'),
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