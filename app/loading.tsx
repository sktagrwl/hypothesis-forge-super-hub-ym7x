export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      color: '#f5f1e8',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '1px',
          backgroundColor: '#d4a574',
          margin: '0 auto 16px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        <p style={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.1em',
          color: 'rgba(245, 241, 232, 0.55)',
          textTransform: 'uppercase',
        }}>Loading...</p>
        <style>{`@keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
      </div>
    </div>
  )
}
