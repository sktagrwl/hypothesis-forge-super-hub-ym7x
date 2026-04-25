'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app/error.tsx] Caught error:', error)

    try {
      if (window.self !== window.top) {
        const isHallucination =
          error.message.includes('Element type is invalid') ||
          error.message.includes('is not a function') ||
          error.message.includes('is not defined')

        const payload = {
          type: 'react_error',
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }

        window.parent.postMessage(
          { type: 'CHILD_APP_ERROR', source: 'architect-child-app', payload },
          '*'
        )

        if (isHallucination) {
          window.parent.postMessage(
            {
              type: 'FIX_ERROR_REQUEST',
              source: 'architect-child-app',
              payload: {
                ...payload,
                action: 'fix',
                fixPrompt: `Fix the following runtime error (likely a hallucinated component name):\n\n**Error:** ${error.message}\n\n**Stack:** ${error.stack?.substring(0, 500)}\n\n**Instructions:** Replace any undefined/hallucinated component with a valid shadcn/ui component or define it inline as a function in page.tsx.`,
              },
            },
            '*'
          )
        }
      }
    } catch {
      // Cross-origin or postMessage failure — ignore
    }
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#0f0f0f',
          border: '1px solid rgba(245, 241, 232, 0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#c85050',
            color: '#0a0a0a',
            padding: '16px 24px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Inter', system-ui, sans-serif",
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Something went wrong
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          <p
            style={{
              margin: '0 0 16px',
              fontSize: '13px',
              color: '#f5f1e8',
              fontFamily: "'JetBrains Mono', monospace",
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              padding: '12px',
              border: '1px solid rgba(245, 241, 232, 0.15)',
              wordBreak: 'break-word',
            }}
          >
            {error.message}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={reset}
              style={{
                flex: 1,
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0a0a0a',
                backgroundColor: '#d4a574',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: "'Inter', system-ui, sans-serif",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                flex: 1,
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#d4a574',
                backgroundColor: 'transparent',
                border: '1px solid rgba(245, 241, 232, 0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: "'Inter', system-ui, sans-serif",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
