'use client';

import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header
      className="h-16 flex items-center justify-between px-6"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 transition-colors"
          style={{ color: 'var(--text)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1
          className="font-serif text-xl font-semibold uppercase"
          style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
        >
          HypothesisHQ
        </h1>
        <span
          className="font-mono text-xs tracking-wider uppercase hidden sm:inline"
          style={{ color: 'var(--text-dim)' }}
        >
          Investment Research Copilot
        </span>
      </div>
    </header>
  );
}
