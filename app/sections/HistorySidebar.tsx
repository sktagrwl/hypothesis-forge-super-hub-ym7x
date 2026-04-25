'use client';

import { Clock, X } from 'lucide-react';

interface AnalysisRecord {
  id: string;
  company_name: string;
  hypothesis: string;
  confidence_score: number;
  createdAt: string;
}

interface HistorySidebarProps {
  open: boolean;
  onClose: () => void;
  analyses: AnalysisRecord[];
  loading: boolean;
  onSelect: (analysis: any) => void;
  selectedId: string | null;
}

export default function HistorySidebar({
  open,
  onClose,
  analyses,
  loading,
  onSelect,
  selectedId,
}: HistorySidebarProps) {
  if (!open) return null;

  return (
    <aside
      className="w-72 h-full flex flex-col shrink-0 overflow-y-auto"
      style={{
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--rule)',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <h3
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          Past Analyses
        </h3>
        <button
          onClick={onClose}
          className="p-1 transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X className="w-4 h-4" style={{ color: 'var(--text-dim)' }} />
        </button>
      </div>
      <div className="p-3 space-y-2 flex-1">
        {loading && (
          <div className="text-center py-8">
            <div className="wd-loading-bar mx-auto mb-3" style={{ width: '40px' }} />
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              Loading...
            </p>
          </div>
        )}
        {!loading && (!Array.isArray(analyses) || analyses.length === 0) && (
          <div className="text-center py-8 px-4">
            <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              No analyses yet. Run your first hypothesis above.
            </p>
          </div>
        )}
        {Array.isArray(analyses) &&
          analyses.map((a) => {
            const score = typeof a.confidence_score === 'number' ? a.confidence_score : 0;
            const isSelected = selectedId === a.id;
            const dateStr = a.createdAt
              ? new Date(a.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              : '';
            return (
              <button
                key={a.id}
                onClick={() => onSelect(a)}
                className="w-full text-left p-3 transition-colors"
                style={{
                  border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--rule)'}`,
                  backgroundColor: isSelected ? 'rgba(212, 165, 116, 0.08)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(245, 241, 232, 0.03)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-sm font-serif tracking-wide truncate"
                    style={{ color: 'var(--text)' }}
                  >
                    {a.company_name ?? 'Unknown'}
                  </span>
                  <span
                    className="font-mono text-xs shrink-0 ml-2 px-2 py-0.5"
                    style={{
                      border: '1px solid var(--rule)',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {score}%
                  </span>
                </div>
                <p
                  className="text-xs font-sans leading-relaxed"
                  style={{
                    color: 'var(--text-dim)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {a.hypothesis ?? ''}
                </p>
                {dateStr && (
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {dateStr}
                  </p>
                )}
              </button>
            );
          })}
      </div>
    </aside>
  );
}
