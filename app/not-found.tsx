export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#f5f1e8',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 600,
          margin: 0,
          fontFamily: "'Fraunces', serif",
          letterSpacing: '-0.02em',
          color: '#f5f1e8',
        }}>404</h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(245, 241, 232, 0.55)',
          marginTop: '8px',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>Page not found</p>
      </div>
    </div>
  )
}
