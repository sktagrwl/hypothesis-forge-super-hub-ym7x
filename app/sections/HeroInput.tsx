'use client';

import { Search, Check, Loader2 } from 'lucide-react';

interface HeroInputProps {
  companyName: string;
  setCompanyName: (v: string) => void;
  hypothesis: string;
  setHypothesis: (v: string) => void;
  loading: boolean;
  currentStep: number;
  onAnalyze: () => void;
  useSample: boolean;
  setUseSample: (v: boolean) => void;
}

const STEPS = [
  'Fetching stock data...',
  'Analyzing fundamentals...',
  'Checking sentiment...',
  'Synthesizing results...',
];

export default function HeroInput({
  companyName,
  setCompanyName,
  hypothesis,
  setHypothesis,
  loading,
  currentStep,
  onAnalyze,
  useSample,
  setUseSample,
}: HeroInputProps) {
  return (
    <div className="max-w-[700px] mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="font-serif text-2xl font-semibold"
            style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            Test Your Investment Thesis
          </h2>
          <p
            className="text-sm mt-2 font-sans leading-relaxed"
            style={{ color: 'var(--text-dim)' }}
          >
            Enter a company and your hypothesis. Our AI will analyze fundamentals, sentiment, and news to evaluate your thesis.
          </p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer shrink-0 ml-4">
          <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            Sample Data
          </span>
          <div
            className="relative w-10 h-5 transition-colors"
            style={{
              borderRadius: '4px',
              backgroundColor: useSample ? 'var(--accent)' : 'var(--surface)',
              border: '1px solid var(--rule)',
            }}
            onClick={() => setUseSample(!useSample)}
          >
            <div
              className="absolute top-0.5 w-4 h-4 transition-transform"
              style={{
                borderRadius: '2px',
                backgroundColor: useSample ? 'var(--bg)' : 'var(--text-dim)',
                transform: useSample ? 'translateX(20px)' : 'translateX(2px)',
              }}
            />
          </div>
        </label>
      </div>

      <div
        className="p-8 space-y-6"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--rule)',
        }}
      >
        <div className="space-y-2">
          <label
            className="font-mono text-xs tracking-widest uppercase block"
            style={{ color: 'var(--text-dim)' }}
          >
            Company Name
          </label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Reliance, TCS, Infosys"
            disabled={loading}
            className="w-full px-4 py-3 text-sm font-sans transition-colors"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--text)',
              borderRadius: '4px',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--input-border)')}
          />
        </div>
        <div className="space-y-2">
          <label
            className="font-mono text-xs tracking-widest uppercase block"
            style={{ color: 'var(--text-dim)' }}
          >
            Your Hypothesis
          </label>
          <textarea
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder="e.g., I think TCS will grow because of strong digital transformation demand and increasing cloud adoption..."
            rows={4}
            disabled={loading}
            className="w-full px-4 py-3 text-sm font-sans leading-relaxed transition-colors resize-none"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--text)',
              borderRadius: '4px',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--input-border)')}
          />
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading || !companyName.trim() || !hypothesis.trim()}
          className="w-full px-6 py-3 text-sm font-sans font-semibold tracking-wider uppercase transition-colors disabled:opacity-40"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg)',
            borderRadius: '4px',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent)';
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Analyze Hypothesis
            </span>
          )}
        </button>
      </div>

      {loading && (
        <div className="mt-8">
          {/* Pulsing gold loading bar */}
          <div className="wd-loading-bar mb-6" />
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 flex items-center justify-center"
                  style={{
                    border: `1px solid ${i <= currentStep ? 'var(--accent)' : 'var(--rule)'}`,
                    backgroundColor: i < currentStep ? 'var(--accent)' : 'transparent',
                    color: i < currentStep ? 'var(--bg)' : i === currentStep ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                >
                  {i < currentStep ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : i === currentStep ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span className="font-mono text-xs">{i + 1}</span>
                  )}
                </div>
                <span
                  className="font-mono text-xs tracking-wide hidden md:inline"
                  style={{ color: i <= currentStep ? 'var(--text)' : 'var(--text-muted)' }}
                >
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 mx-2"
                    style={{
                      height: '1px',
                      backgroundColor: i < currentStep ? 'var(--accent)' : 'var(--rule)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
