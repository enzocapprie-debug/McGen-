// src/components/layout/DashboardHeader.tsx
'use client';

import { Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  return (
    <header style={{
      height: 60,
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      background: 'var(--bg-secondary)',
      flexShrink: 0,
    }}>
      <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Link href="/generator" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '7px 16px', borderRadius: 9,
            background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
            border: 'none', color: 'white',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            transition: 'opacity 0.15s'
          }}>
            <Wand2 size={13} />
            New Mockup
          </button>
        </Link>
      </div>
    </header>
  );
}
