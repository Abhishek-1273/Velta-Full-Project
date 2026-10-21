import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getVeltaResponse } from './veltaKnowledge'
import styles from './VeltaChat.module.css'

const quickQuestions = [
  "What is WhatsFlow?",
  "Custom software & CRMs",
  "Automation & n8n systems",
  "Request a live demo",
  "How to get started?",
]

function renderFormattedContent(text) {
  if (!text) return null
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    const parts = []
    let lastIndex = 0
    const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
    let match

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index))
      }
      if (match[1] && match[2]) {
        const label = match[1]
        const url = match[2]
        const isExternal = url.startsWith('http') || url.startsWith('//')
        parts.push(
          isExternal ? (
            <a key={`${lineIdx}-${match.index}`} href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ) : (
            <Link key={`${lineIdx}-${match.index}`} to={url}>
              {label}
            </Link>
          )
        )
      } else if (match[3]) {
        parts.push(<strong key={`${lineIdx}-${match.index}`}>{match[3]}</strong>)
      }
      lastIndex = regex.lastIndex
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex))
    }

    return (
      <span key={lineIdx}>
        {parts.length > 0 ? parts : line}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    )
  })
}

export default function VeltaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm VeltaZ AI 👋\n\nAsk me anything about VeltaZ products, custom software, or automations — I'm here to help!",
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
  }, [messages, loading])

  const sendMessage = useCallback((text, currentMessages) => {
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...currentMessages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    // Role-based instant intelligence with a natural micro-delay for realistic conversational UX
    setTimeout(() => {
      const reply = getVeltaResponse(text)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      setLoading(false)
      if (!open) setUnread((prev) => prev + 1)
    }, 400)
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
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.msgUser : styles.msgBot}`}>
                {m.role === 'assistant' && (
                  <div className={styles.msgAvatar}>
                    <img src="/logo/logo-white.png" alt="VeltaZ AI Logo" className={styles.avatarImg} />
                  </div>
                )}
                <div className={styles.msgBubble}>
                  {renderFormattedContent(m.content)}
                </div>
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
              aria-label="Send message"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div className={styles.footer}>Powered by VeltaZ Knowledge Engine</div>
        </div>
      )}

      <button className={styles.fab} onClick={() => setOpen((o) => !o)} aria-label="Open VeltaZ Assistant">
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