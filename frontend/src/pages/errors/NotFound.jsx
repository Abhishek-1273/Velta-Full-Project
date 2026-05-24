import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '6rem', fontWeight: 700, margin: 0, opacity: 0.1, lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>Page not found</h1>
      <p style={{ color: 'var(--text2, #888)', maxWidth: 400, lineHeight: 1.6 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{ marginTop: '2rem', padding: '10px 24px', borderRadius: 8, background: 'var(--accent, #00e5ff)', color: '#000', textDecoration: 'none', fontWeight: 500 }}
      >
        Back to home
      </Link>
    </div>
  )
}
