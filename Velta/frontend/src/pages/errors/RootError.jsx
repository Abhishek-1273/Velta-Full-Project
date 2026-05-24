import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

export default function RootError() {
  const error = useRouteError()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred. Please try refreshing the page.'
  let status = null

  if (isRouteErrorResponse(error)) {
    status = error.status
    if (error.status === 404) {
      title = 'Page not found'
      message = "The page you're looking for doesn't exist."
    } else if (error.status === 401) {
      title = 'Not authorised'
      message = 'Please sign in to access this page.'
    } else if (error.status === 403) {
      title = 'Access denied'
      message = "You don't have permission to view this page."
    } else if (error.status >= 500) {
      title = 'Server error'
      message = 'Our servers ran into a problem. Please try again in a moment.'
    }
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'var(--font-sans, sans-serif)',
    }}>
      {status && (
        <p style={{ fontSize: '5rem', fontWeight: 700, margin: 0, opacity: 0.15, lineHeight: 1 }}>
          {status}
        </p>
      )}
      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>{title}</h1>
      <p style={{ color: 'var(--text2, #888)', maxWidth: 420, lineHeight: 1.6 }}>{message}</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid currentColor', background: 'transparent', cursor: 'pointer' }}
        >
          Try again
        </button>
        <Link
          to="/"
          style={{ padding: '10px 20px', borderRadius: 8, background: 'var(--accent, #00e5ff)', color: '#000', textDecoration: 'none', fontWeight: 500 }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
