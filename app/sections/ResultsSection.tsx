'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  BarChart2,
} from 'lucide-react';

interface NewsItem {
  title?: string;
  sentiment?: string;
  hypothesis_relevant?: boolean;
  summary?: string;
}

interface AnalysisData {
  company_name?: string;
  hypothesis?: string;
  fundamentals_summary?: string;
  sentiment_summary?: string;
  confirmations?: string[];
  contradictions?: string[];
  confidence_score?: number;
  confidence_rationale?: string;
  key_numbers?: string;
  strengths?: string[];
  concerns?: string[];
  overall_sentiment?: string;
  bullish_drivers?: string[];
  bearish_drivers?: string[];
  news_breakdown?: NewsItem[];
  disclaimer?: string;
}

interface ResultsSectionProps {
  data: AnalysisData | null;
}

function renderMarkdown(text: string) {
  if (!text) return null;
  return (
    <div className="space-y-2">
      {text.split('\n').map((line, i) => {
        if (line.startsWith('### '))
          return <h4 key={i} className="font-serif font-normal text-sm mt-3 mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{line.slice(4)}</h4>;
        if (line.startsWith('## '))
          return <h3 key={i} className="font-serif font-normal text-base mt-3 mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{line.slice(3)}</h3>;
        if (line.startsWith('# '))
          return <h2 key={i} className="font-serif font-normal text-lg mt-4 mb-2" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{line.slice(2)}</h2>;
        if (line.startsWith('- ') || line.startsWith('* '))
          return <li key={i} className="ml-4 list-disc text-sm font-sans leading-relaxed" style={{ color: 'var(--text)' }}>{formatInline(line.slice(2))}</li>;
        if (/^\d+\.\s/.test(line))
          return <li key={i} className="ml-4 list-decimal text-sm font-sans leading-relaxed" style={{ color: 'var(--text)' }}>{formatInline(line.replace(/^\d+\.\s/, ''))}</li>;
        if (!line.trim()) return <div key={i} className="h-1" />;
        return <p key={i} className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text)' }}>{formatInline(line)}</p>;
      })}
    </div>
  );
}

function formatInline(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold" style={{ color: 'var(--text)' }}>{part}</strong> : part
  );
}

function ScoreGauge({ score }: { score: number }) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const angle = (clampedScore / 100) * 180;
  const rad = (angle - 180) * (Math.PI / 180);
  const cx = 60;
  const cy = 55;
  const r = 40;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);
  const largeArc = angle > 180 ? 1 : 0;
  const color = score >= 70 ? 'var(--gain)' : score >= 40 ? 'var(--accent)' : 'var(--loss)';

  return (
    <svg width="120" height="70" viewBox="0 0 120 70" className="mx-auto">
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="var(--rule)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {clampedScore > 0 && (
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${x} ${y}`}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
      <text x={cx} y={cy - 5} textAnchor="middle" className="font-mono" fontSize="22" fill="var(--text)" fontWeight="500">
        {clampedScore}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" className="font-mono" fontSize="8" fill="var(--text-dim)" letterSpacing="0.15em">
        CONFIDENCE
      </text>
    </svg>
  );
}

function sentimentBadgeStyle(sentiment?: string): React.CSSProperties {
  const s = (sentiment ?? '').toUpperCase();
  if (s.includes('BULL') || s.includes('POSITIVE'))
    return { backgroundColor: 'rgba(90, 155, 107, 0.15)', color: 'var(--gain)', border: '1px solid rgba(90, 155, 107, 0.3)' };
  if (s.includes('BEAR') || s.includes('NEGATIVE'))
    return { backgroundColor: 'rgba(200, 80, 80, 0.15)', color: 'var(--loss)', border: '1px solid rgba(200, 80, 80, 0.3)' };
  return { backgroundColor: 'rgba(212, 165, 116, 0.15)', color: 'var(--accent)', border: '1px solid rgba(212, 165, 116, 0.3)' };
}

export default function ResultsSection({ data }: ResultsSectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!data) return null;

  const confirmations = Array.isArray(data.confirmations) ? data.confirmations : [];
  const contradictions = Array.isArray(data.contradictions) ? data.contradictions : [];
  const score = typeof data.confidence_score === 'number' ? data.confidence_score : 0;
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const concerns = Array.isArray(data.concerns) ? data.concerns : [];
  const bullishDrivers = Array.isArray(data.bullish_drivers) ? data.bullish_drivers : [];
  const bearishDrivers = Array.isArray(data.bearish_drivers) ? data.bearish_drivers : [];
  const newsBreakdown = Array.isArray(data.news_breakdown) ? data.news_breakdown : [];

  const toggleSection = (s: string) => setExpandedSection(expandedSection === s ? null : s);

  return (
    <div className="max-w-[700px] mx-auto pb-12 px-4">
      {/* Section divider */}
      <div style={{ borderTop: '1px solid var(--rule)' }} className="mb-8" />

      <div className="mb-6 flex items-center gap-3">
        <h3
          className="font-serif text-xl font-semibold"
          style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
        >
          Results for {data.company_name ?? 'Company'}
        </h3>
        {data.overall_sentiment && (
          <span
            className="font-mono text-xs tracking-wider px-3 py-1"
            style={sentimentBadgeStyle(data.overall_sentiment)}
          >
            {data.overall_sentiment}
          </span>
        )}
      </div>

      {/* Three main cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Confirmations */}
        <div
          className="p-6"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderLeft: '3px solid var(--gain)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" style={{ color: 'var(--gain)' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>
              Confirmations
            </span>
          </div>
          {confirmations.length === 0 ? (
            <p className="text-sm font-sans" style={{ color: 'var(--text-dim)' }}>No confirmations found.</p>
          ) : (
            <ul className="space-y-2">
              {confirmations.map((c, i) => (
                <li key={i} className="text-sm font-sans leading-relaxed flex gap-2" style={{ color: 'var(--text)' }}>
                  <span style={{ color: 'var(--gain)' }} className="mt-0.5 shrink-0">+</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contradictions */}
        <div
          className="p-6"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderLeft: '3px solid var(--loss)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4" style={{ color: 'var(--loss)' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>
              Contradictions
            </span>
          </div>
          {contradictions.length === 0 ? (
            <p className="text-sm font-sans" style={{ color: 'var(--text-dim)' }}>No contradictions found.</p>
          ) : (
            <ul className="space-y-2">
              {contradictions.map((c, i) => (
                <li key={i} className="text-sm font-sans leading-relaxed flex gap-2" style={{ color: 'var(--text)' }}>
                  <span style={{ color: 'var(--loss)' }} className="mt-0.5 shrink-0">-</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Confidence Score */}
        <div
          className="p-6"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--rule)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>
              Confidence Score
            </span>
          </div>
          <ScoreGauge score={score} />
          {data.confidence_rationale && (
            <p className="text-xs font-sans mt-3 leading-relaxed text-center" style={{ color: 'var(--text-dim)' }}>
              {data.confidence_rationale}
            </p>
          )}
        </div>
      </div>

      {/* Collapsible underlying data */}
      <div className="space-y-2">
        <h4
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: 'var(--text-dim)' }}
        >
          View Underlying Data
        </h4>

        {/* Fundamentals */}
        <CollapsibleBlock
          title="Fundamentals Summary"
          expanded={expandedSection === 'fundamentals'}
          onToggle={() => toggleSection('fundamentals')}
        >
          <div className="space-y-4">
            {data.key_numbers && (
              <div>
                <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--text-dim)' }}>Key Numbers</p>
                {renderMarkdown(data.key_numbers)}
              </div>
            )}
            {data.fundamentals_summary && (
              <div>
                <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--text-dim)' }}>Summary</p>
                {renderMarkdown(data.fundamentals_summary)}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strengths.length > 0 && (
                <div className="p-4" style={{ border: '1px solid var(--rule)' }}>
                  <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--text-dim)' }}>Strengths</p>
                  <ul className="space-y-1">
                    {strengths.map((s, i) => (
                      <li key={i} className="text-sm font-sans leading-relaxed flex gap-2" style={{ color: 'var(--text)' }}>
                        <span style={{ color: 'var(--gain)' }} className="shrink-0">+</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {concerns.length > 0 && (
                <div className="p-4" style={{ border: '1px solid var(--rule)' }}>
                  <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--text-dim)' }}>Concerns</p>
                  <ul className="space-y-1">
                    {concerns.map((c, i) => (
                      <li key={i} className="text-sm font-sans leading-relaxed flex gap-2" style={{ color: 'var(--text)' }}>
                        <span style={{ color: 'var(--loss)' }} className="shrink-0">-</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CollapsibleBlock>

        {/* News Sentiment */}
        <CollapsibleBlock
          title="News Sentiment"
          expanded={expandedSection === 'news'}
          onToggle={() => toggleSection('news')}
        >
          <div className="space-y-4">
            {data.sentiment_summary && (
              <div className="mb-4">
                <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--text-dim)' }}>Sentiment Overview</p>
                {renderMarkdown(data.sentiment_summary)}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {bullishDrivers.length > 0 && (
                <div className="p-4" style={{ border: '1px solid var(--rule)' }}>
                  <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--gain)' }}>
                    Bullish Drivers
                  </p>
                  <ul className="space-y-1">
                    {bullishDrivers.map((d, i) => (
                      <li key={i} className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text)' }}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {bearishDrivers.length > 0 && (
                <div className="p-4" style={{ border: '1px solid var(--rule)' }}>
                  <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--loss)' }}>
                    Bearish Drivers
                  </p>
                  <ul className="space-y-1">
                    {bearishDrivers.map((d, i) => (
                      <li key={i} className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text)' }}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {newsBreakdown.length > 0 && (
              <div>
                <p className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: 'var(--text-dim)' }}>News Breakdown</p>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {newsBreakdown.map((item, i) => (
                    <div key={i} className="p-4" style={{ border: '1px solid var(--rule)' }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-sans font-medium leading-snug" style={{ color: 'var(--text)' }}>
                          {item.title ?? 'Untitled'}
                        </p>
                        <div className="flex gap-1 shrink-0">
                          <span
                            className="font-mono text-xs px-2 py-0.5"
                            style={sentimentBadgeStyle(item.sentiment)}
                          >
                            {item.sentiment ?? 'N/A'}
                          </span>
                          {item.hypothesis_relevant && (
                            <span
                              className="font-mono text-xs px-2 py-0.5"
                              style={{
                                border: '1px solid var(--rule)',
                                color: 'var(--text-dim)',
                              }}
                            >
                              Relevant
                            </span>
                          )}
                        </div>
                      </div>
                      {item.summary && (
                        <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                          {item.summary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleBlock>

        {/* Hypothesis Recap */}
        <CollapsibleBlock
          title="Hypothesis Recap"
          expanded={expandedSection === 'hypothesis'}
          onToggle={() => toggleSection('hypothesis')}
        >
          <div className="space-y-3">
            {data.hypothesis && (
              <div>
                <p className="font-mono text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--text-dim)' }}>Your Hypothesis</p>
                <p className="text-sm font-sans leading-relaxed italic" style={{ color: 'var(--text)' }}>{data.hypothesis}</p>
              </div>
            )}
          </div>
        </CollapsibleBlock>
      </div>

      {/* Disclaimer */}
      {data.disclaimer && (
        <div className="mt-12 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
          <p className="text-xs font-sans tracking-wide leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {data.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

function CollapsibleBlock({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: '1px solid var(--rule)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 transition-colors"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 241, 232, 0.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span className="text-sm font-sans tracking-wider" style={{ color: 'var(--text)' }}>{title}</span>
        {expanded ? (
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-dim)' }} />
        ) : (
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-dim)' }} />
        )}
      </button>
      {expanded && <div className="px-5 pb-5 pt-2">{children}</div>}
    </div>
  );
}
